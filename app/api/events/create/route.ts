import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    console.log('Received body:', bodyText);

    if (!bodyText) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    const { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players, imageUrl } = JSON.parse(bodyText);
    console.log('Parsed data:', { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players, imageUrl });

    const defaultImageUrl = '/images/banner_img.jpg';


    const newEvent = await prisma.event.create({
      data: {
        name,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        location: {
          street: location.street,
          city: location.city,
          state: location.state,
          zip: location.zip,
        },
        description,
        imageUrl: imageUrl || defaultImageUrl,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        players: {
          create: players.map((player: any) => ({
            name: player.name,
            paiement: player.paiement,
            niveau: player.niveau,
            genre: player.genre,
          })),
        },
      },
      include: {
        players: true,
      },
    });

    console.log('New event created:', newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
