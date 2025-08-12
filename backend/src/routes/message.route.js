// backend/src/routes/message.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import {
    getUsersForSidebar,
    getMessages,
    sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// IMPORTANT: put static paths before "/:id"
router.get("/users", protectRoute, getUsersForSidebar);

// Get chat history with a specific user
router.get("/:id", protectRoute, getMessages);

// Send a message to a specific user
// Expects FormData with optional "files" (up to 5) and optional "text"
router.post("/:id", protectRoute, upload.array("files", 5), sendMessage);

export default router;
