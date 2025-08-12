// frontend/src/store/useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (selectedUser) => set({ selectedUser, messages: [] }),

  // Sidebar users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users", { withCredentials: true });
      set({ users: res.data || [] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Load conversation
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`, { withCredentials: true });
      set({ messages: res.data || [] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send message (supports text + files; optional legacy base64 image)
  // Usage: sendMessage({ text, files })  // files: File[]
  //        sendMessage({ text, image })  // image: base64 string (optional legacy)
  sendMessage: async (messageData = {}) => {
    const { selectedUser, messages } = get();
    if (!selectedUser?._id) {
      toast.error("No conversation selected");
      return;
    }

    try {
      const fd = new FormData();
      if (messageData.text && messageData.text.trim()) fd.append("text", messageData.text.trim());

      // files array (from <input type="file" multiple />)
      if (Array.isArray(messageData.files)) {
        messageData.files.forEach((f) => fd.append("files", f));
      }

      // optional legacy base64 image (server reads as field in multipart)
      if (messageData.image && typeof messageData.image === "string") {
        fd.append("image", messageData.image);
      }

      const res = await axiosInstance.post(`/messages/${selectedUser._id}`, fd, {
        withCredentials: true,
        // DO NOT set Content-Type; axios will set multipart boundary for FormData
      });

      const sent = res.data;
      set({ messages: [...messages, sent] }); // optimistic append
      return sent;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send");
    }
  },

  // Socket subscription
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage").on("newMessage", (newMessage) => {
      const sel = get().selectedUser;
      if (!sel) return;

      const selId = String(sel._id);
      const belongsToOpenThread =
        String(newMessage.senderId) === selId || String(newMessage.receiverId) === selId;

      if (!belongsToOpenThread) return;

      // de-dupe by _id in case we already optimistically added it
      const curr = get().messages;
      const already = curr.some((m) => String(m._id) === String(newMessage._id));
      if (already) return;

      set({ messages: [...curr, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
