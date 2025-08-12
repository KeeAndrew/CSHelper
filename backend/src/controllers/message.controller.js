import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

/* ---------------- helpers ---------------- */

function filesToAttachments(files = []) {
  // non-image files will be served from /uploads/<filename>
  return (files || [])
    .filter((f) => !(f.mimetype || "").startsWith("image/"))
    .map((f) => ({
      url: `/uploads/${f.filename}`,
      filename: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
    }));
}

async function uploadImagesToCloudinary(files = []) {
  const urls = [];
  for (const f of files) {
    if (!(f.mimetype || "").startsWith("image/")) continue;
    // multer disk storage provides f.path; Cloudinary accepts a file path
    try {
      const up = await cloudinary.uploader.upload(f.path);
      if (up?.secure_url) urls.push(up.secure_url);
    } catch (e) {
      console.warn("Cloudinary upload failed for", f.originalname, e?.message || e);
    }
  }
  return urls;
}

/* ---------------- controllers ---------------- */

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
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    // Your route is /api/messages/:id (receiver)
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Support both JSON (old flow) and multipart (new flow)
    const text = (req.body?.text || "").trim();

    // 1) Base64 image from JSON (back-compat with your old UI)
    let imageUrl = null;
    if (req.body?.image) {
      const uploadResponse = await cloudinary.uploader.upload(req.body.image);
      imageUrl = uploadResponse.secure_url;
    }

    // 2) Multipart files (from multer) — images -> Cloudinary, others -> /uploads
    const files = Array.isArray(req.files) ? req.files : [];
    const uploadedImageUrls = await uploadImagesToCloudinary(files);
    if (!imageUrl && uploadedImageUrls.length) {
      // keep the first image as the legacy single "image" field
      imageUrl = uploadedImageUrls[0];
    }

    const attachments = filesToAttachments(files); // non-images become attachments

    if (!text && !imageUrl && attachments.length === 0) {
      return res.status(400).json({ message: "text or files required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || undefined,   // keep your existing schema happy
      // If you added attachments to your schema, this will be saved.
      // If not, Mongoose will ignore it (strict mode).
      attachments,
    });

    await newMessage.save();

    // Socket push to receiver (and your own client if you handle that)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
