import { Request, Response } from 'express';
import prisma from '../prisma';

export const getWeather = async (req: Request, res: Response) => {
  try {
    // For now, fetch the latest weather data entry
    // In a real app, this might fetch from an external API or filter by location
    const weather = await prisma.weatherData.findFirst({
      orderBy: {
        date: 'desc',
      },
    });
    res.json(weather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};
