// app/api/events/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();




export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function main() {
  await prisma.event.createMany({
    data: [
      {
        dateEnd:  new Date('2024-06-23T00:00:00Z'),
        dateStart: new Date('2024-06-22T00:00:00Z'),
        name: 'Stage IBV Us Cagnes',
        location: {
          street :'PLage 32',
          city: 'Cagnes sur mer',
          state:  'France',
          zip: '06'
        },
        description: 'Stage de perfectionnement intensif au beach volley',
        numberPlaceMen: 12,
        numberPlaceWomen: 12,
        autre: 'Prix 100€',
        players: {}
      },
      {
        dateEnd:  new Date('2024-07-12T00:00:00Z'),
        dateStart: new Date('2024-07-10T00:00:00Z'),
        name: 'Stage IBV Monaco',
        location: {
          street :'La Turbie',
          city: 'Monaco',
          state:  'France',
          zip: '06'
        },
        description: 'Stage de perfectionnement intensif au beach volley',
        numberPlaceMen: 12,
        numberPlaceWomen: 12,
        autre: 'Prix 110€',
        players: {}
      },
    ],
  });
}


export async function POST(req: NextRequest) {
  try {
    const { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players } = await req.json();
    const newEvent = await prisma.event.create({
      data: {
        name,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        location,
        description,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        players,
      },
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players } = await req.json();
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        location,
        description,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        players
      },
    });
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     await prisma.event.delete({ where: { id } });
//     return NextResponse.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
//   }
// }
