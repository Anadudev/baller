import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // @ts-ignore
      res.status(201).json(user);
  } catch (error) {
    // @ts-ignore
      res.status(400).json({ message: error.message });
  }
};