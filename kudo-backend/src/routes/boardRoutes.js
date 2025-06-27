import express from "express";
const router = express.Router();
import { createBoard, getBoards, getBoardById, deleteBoard } from "../controller/board.js";

router.post("/", createBoard);
router.get("/", getBoards);
router.get("/:id", getBoardById);
router.delete("/:id", deleteBoard);

export default router;
