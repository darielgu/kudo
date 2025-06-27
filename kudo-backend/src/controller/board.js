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

export const getBoards = async (req, res) => {
    try {
        const boards = await prisma.board.findMany();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await prisma.board.findUnique({
            where: { id: parseInt(id) }
        });
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await prisma.board.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}