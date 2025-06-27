import express from "express";
const router = express.Router();
import { createBoard } from "../controller/board.js";

router.post("/", createBoard);

export default router;
