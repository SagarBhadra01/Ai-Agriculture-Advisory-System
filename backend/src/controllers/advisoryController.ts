import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAdvisories = async (req: Request, res: Response) => {
  try {
    const advisories = await prisma.cropAdvisory.findMany({
      include: {
        crop: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    res.json(advisories);
  } catch (error) {
    console.error('Error fetching advisories:', error);
    res.status(500).json({ error: 'Failed to fetch advisories' });
  }
};

export const createAdvisory = async (req: Request, res: Response) => {
  try {
    const { cropId, location, stage, status, message } = req.body;
    const advisory = await prisma.cropAdvisory.create({
      data: {
        cropId,
        location,
        stage,
        status,
        message,
      },
    });
    res.status(201).json(advisory);
  } catch (error) {
    console.error('Error creating advisory:', error);
    res.status(500).json({ error: 'Failed to create advisory' });
  }
};
