import express from "express";
import { askAI, chatAI } from "../controllers/ai.controller.js"; // add chatAI

const router = express.Router();

router.post("/ask", askAI);
router.post("/chat", chatAI); // <-- add this

export default router;
