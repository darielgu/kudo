import express from "express";
const router = express.Router();
import { createCard, getCards, updateCard, deleteCard } from "../controller/card.js";

router.post("/", createCard);
router.get("/", getCards);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;