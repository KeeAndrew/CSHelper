import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:recipientId", protectRoute, getMessages);
router.post("/", protectRoute, upload.array("files", 5), sendMessage); // ⬅️ FormData

export default router;
