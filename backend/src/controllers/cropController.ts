import { Request, Response } from 'express';
import prisma from '../prisma';

export const getCrops = async (req: Request, res: Response) => {
  try {
    const crops = await prisma.crop.findMany({
      include: {
        marketPrices: true,
        suitability: {
          include: {
            soilType: true,
            season: true,
          },
        },
      },
    });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

export const getCropById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const crop = await prisma.crop.findUnique({
      where: { id: Number(id) },
      include: {
        marketPrices: true,
        suitability: {
          include: {
            soilType: true,
            season: true,
          },
        },
      },
    });
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crop' });
  }
};
