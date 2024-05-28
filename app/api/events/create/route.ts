import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  try {
    const { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players } = await req.json();
    const newEvent = await prisma.event.create({
      data: {
        name,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        location : {
          street: location.street,
          city: location.city,
          state: location.state,
          zip: location.zip
        },
        description,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        players,
      },
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
