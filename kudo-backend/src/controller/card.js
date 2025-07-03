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
        // Sort: pinned first (most recent pinned_at first), then unpinned by id desc (creation time)
        const cards = await prisma.cards.findMany({
            orderBy: [
                { pinned: 'desc' },
                { pinned_at: 'desc' },
                { id: 'desc' }
            ]
        });
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

// Pin or unpin a card
export const togglePin = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await prisma.cards.findUnique({ where: { id: parseInt(id) } });
        if (!card) return res.status(404).json({ error: 'Card not found' });
        const isPinned = card.pinned;
        const updated = await prisma.cards.update({
            where: { id: parseInt(id) },
            data: {
                pinned: !isPinned,
                pinned_at: !isPinned ? new Date() : null
            }
        });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}