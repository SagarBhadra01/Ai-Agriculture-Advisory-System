import { Request, Response } from 'express';
import prisma from '../prisma';

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { district } = req.query;
    
    let whereClause = {};
    if (district) {
      whereClause = { location: String(district) };
    }

    const weather = await prisma.weatherData.findFirst({
      where: whereClause,
      orderBy: {
        date: 'desc',
      },
    });

    if (!weather && district) {
       // Fallback if specific district not found (though our seed ensures coverage)
       const fallback = await prisma.weatherData.findFirst();
       return res.json(fallback);
    }

    res.json(weather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};
