import { Request, Response } from 'express';
import prisma from '../prisma';

export const getCrops = async (req: Request, res: Response) => {
  try {
    const { district } = req.query;

    if (district) {
      // Location-based recommendation
      const districtCrops = await prisma.districtCrop.findMany({
        where: { district: String(district) },
        include: {
          crop: true,
          season: true,
          soilType: true,
        },
      });

      // Map to flatten structure similar to generic crop response but with local context
      const crops = districtCrops.map(dc => ({
        ...dc.crop,
        reason: `Suitable for ${dc.district}'s ${dc.soilType.name} soil in ${dc.season.name} season.`,
        suitabilityScore: 90 + Math.floor(Math.random() * 10), // High score for local matches
      }));

      return res.json(crops);
    }

    // Fallback: Generic fetch
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
    console.error(error);
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
