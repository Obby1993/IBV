import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Player = {
  name: string;
  paiement: boolean;
  niveau: string;
  genre: string;
};

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  //récupère l'id des params
  const { id } = params;
  const { name, niveau, genre } = await req.json();
  //si il y a une mauvaise id
  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }
// trouve l'event correspondant à l'id
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { players: true },
    });
// si tu ne trouve pas l'event
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // const players: Player[] = Array.isArray(event.players) ? event.players as Player[] : [];

    const newPlayer: Player = { name, paiement: false, niveau, genre };
    // const updatedPlayers = [...players, newPlayer];

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { players: {
        create: newPlayer,
        },
      },
      include: {
        players: true,
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error('Error updating event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
