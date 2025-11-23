import { Request, Response } from 'express';
import prisma from '../prisma';

export const getMarketPrices = async (req: Request, res: Response) => {
  try {
    const prices = await prisma.marketPrice.findMany({
      include: {
        crop: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
};
