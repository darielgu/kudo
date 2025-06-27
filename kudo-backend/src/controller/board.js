import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBoard = async (req, res) => {
    try {
        const { title, description, image_url, category, author = null } = req.body;
        console.log(req.body);
        const board = await prisma.board.create({
            data: { title, description, image_url, category, author }
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

