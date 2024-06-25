// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('Stripe secret key is not defined in environment variables');
// }

// // Créer une instance de l'API Stripe avec la clé secrète
// const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2024-04-10',
//   typescript: true,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log('Method:', req.method); // Pour déboguer
//   if (req.method === 'POST') {
//     try {
//       const { eventId, playerId } = req.body;
//       const event = await prisma.event.findUnique({
//         where: { id: eventId },
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           stripePriceId: true,
//         },
//       });

//       if (!event) {
//         return res.status(404).json({ error: 'Event not found' });
//       }

//       const session = await stripeAPI.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price: event.stripePriceId, // Utiliser l'ID du prix Stripe depuis la base de données
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?eventId=${eventId}&playerId=${playerId}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel?eventId=${eventId}`,
//       });

//       res.status(200).json({ sessionId: session.id });
//     } catch (error) {
//       console.error('Error creating payment session:', error);
//       res.status(500).json({ error: 'Error creating payment session' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//   }
// }
