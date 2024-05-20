// services/eventService.ts

import { prisma } from '../utils/prisma.js';

export async function findAllEvents() {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    console.error('Failed to retrieve events:', error);
    throw new Error('Error retrieving events');
  }
}
