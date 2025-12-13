import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAdvisories = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.query;
    
    let whereClause: any = {};
    if (userEmail) {
      const user = await prisma.user.findUnique({
        where: { email: String(userEmail) },
      });
      if (user) {
        whereClause.userId = user.id;
      } else {
        // User not found in DB yet (maybe new Clerk user not synced)
        // Return empty or global public advisories if we had them
        // For now, return empty to be safe
        return res.json([]);
      }
    }

    const advisories = await prisma.cropAdvisory.findMany({
      where: whereClause,
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
    const { cropId, location, stage, status, message, userEmail } = req.body;
    
    let userId = null;
    if (userEmail) {
      // Sync user from frontend/Clerk to our DB
      const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: { 
          email: userEmail,
          name: userEmail.split('@')[0] // Default name from email
        }
      });
      userId = user.id;
    }

    const advisory = await prisma.cropAdvisory.create({
      data: {
        cropId,
        location,
        stage,
        status,
        message,
        userId
      },
    });
    res.status(201).json(advisory);
  } catch (error) {
    console.error('Error creating advisory:', error);
    res.status(500).json({ error: 'Failed to create advisory' });
  }
};
