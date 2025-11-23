import { Request, Response } from 'express';
import prisma from '../prisma';

export const saveSoilData = async (req: Request, res: Response) => {
  const { userId, nitrogen, phosphorus, potassium, ph, location } = req.body;
  try {
    const soilData = await prisma.soilData.create({
      data: {
        userId,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        location,
      },
    });
    res.json(soilData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save soil data' });
  }
};

export const getSoilData = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const soilData = await prisma.soilData.findMany({
      where: userId ? { userId: Number(userId) } : undefined,
    });
    res.json(soilData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch soil data' });
  }
};
