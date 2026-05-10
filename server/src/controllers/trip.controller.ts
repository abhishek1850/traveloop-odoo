import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createTrip = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { name, startDate, endDate, description } = req.body;

    const trip = await prisma.trip.create({
      data: {
        userId,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
        budget: {
          create: {} // Create empty budget
        }
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

export const getMyTrips = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        stops: true,
        budget: true,
      },
      orderBy: { startDate: 'asc' },
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    const trip = await prisma.trip.findFirst({
      where: { id, userId },
      include: {
        stops: {
          include: {
            activities: {
              include: { activity: true }
            }
          },
          orderBy: { order: 'asc' }
        },
        budget: true,
        packingItems: true,
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};
