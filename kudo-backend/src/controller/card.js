import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCard = async (req, res) => {
    try {
        const { message, image_url, board_id, author = null } = req.body;
        const card = await prisma.cards.create({
            data: { message, image_url, board_id, author }
        });
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCards = async (req, res) => {
    try {
        const cards = await prisma.cards.findMany();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//use case is to update likes, dont think anything else is needed
export const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { likes } = req.body;
        const card = await prisma.cards.update({
            where: { id: parseInt(id) },
            data: { likes }
        });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await prisma.cards.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}