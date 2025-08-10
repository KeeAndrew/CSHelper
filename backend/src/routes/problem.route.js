import express from "express";
import { listProblems, getProblem } from "../controllers/problem.controller.js";

const router = express.Router();
router.get("/", listProblems);
router.get("/:id", getProblem);
export default router;
