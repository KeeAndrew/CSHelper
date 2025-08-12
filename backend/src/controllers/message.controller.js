// backend/src/controllers/message.controller.js
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

/* ---------- helpers ---------- */

// Map multer files (non-images) to attachments stored under /uploads/...
function filesToAttachments(files = []) {
  return (files || [])
    .filter((f) => !(f.mimetype || "").startsWith("image/"))
    .map((f) => ({
      url: `/uploads/${f.filename}`,
      filename: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
    }));
}

// Upload image files to Cloudinary and return secure URLs
async function uploadImagesToCloudinary(files = []) {
  const urls = [];
  for (const f of files) {
    if (!(f.mimetype || "").startsWith("image/")) continue;
    try {
      const up = await cloudinary.uploader.upload(f.path);
      if (up?.secure_url) urls.push(up.secure_url);
    } catch (e) {
      console.warn("Cloudinary upload failed:", f.originalname, e?.message || e);
    }
  }
  return urls;
}

/* ---------- controllers ---------- */

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    // Guard against bad id (prevents /users hitting this route)
    if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const text = (req.body?.text || "").trim();

    // Back-compat: support base64 image sent in JSON body
    let imageUrl = null;
    if (req.body?.image) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.image);
      imageUrl = uploadResponse.secure_url;
    }

    // Multipart files (via multer): images -> Cloudinary, others -> /uploads
    const files = Array.isArray(req.files) ? req.files : [];
    const uploadedImageUrls = await uploadImagesToCloudinary(files);
    if (!imageUrl && uploadedImageUrls.length) {
      imageUrl = uploadedImageUrls[0]; // keep legacy single "image" field
    }
    const attachments = filesToAttachments(files); // non-images

    if (!text && !imageUrl && attachments.length === 0) {
      return res.status(400).json({ message: "text or files required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || undefined,
      attachments, // ok even if your schema doesn't have it: mongoose will ignore if strict
    });

    await newMessage.save();

    // Echo to BOTH users so the sender sees it immediately
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) io.to(senderSocketId).emit("newMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
