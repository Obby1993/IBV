// app/api/events/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//méthode GET
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.error('Error fetching event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Méthode PUT
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, dateStart, dateEnd, numberPlaceMen, numberPlaceWomen, autre, players } = await req.json(); // Modifier en fonction des champs de votre événement

  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        name,
        description,
        dateStart,
        dateEnd,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        players
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error('Error updating event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

//M2thode DELETE
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: id },
    });

    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
