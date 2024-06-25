"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Event } from '../../../types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function RegisterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  // const [eventData, setEventData] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    niveau: '',
    genre: '',
    email: '',
  });

  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     try {
  //       const res = await fetch(`/api/events/${id}`);
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch event data');
  //       }
  //       const data = await res.json();
  //       setEventData(data);
  //     } catch (error) {
  //       console.error('Error fetching event data:', error);
  //     }
  //   };
  //   if (id) {
  //     fetchEventData();
  //   }
  // }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const redirectToCheckout = async ( sessionId: string) => {
  //   const stripe = await stripePromise;
  //   if (!stripe) {
  //     throw new Error('Stripe library failed to load');
  //   }

  //   const { error } = await stripe.redirectToCheckout({
  //     sessionId: sessionId,
  //   });

  //   if (error) {
  //     console.error('Erreur de redirection vers la page de paiement :', error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Envoyer les données du formulaire au backend pour l'inscription
    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, eventId:id} ),
      });

      if (!res.ok) {
        throw new Error('Failed to register');
      }
      const { sessionId } = await res.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe library failed to load');
      }

      await stripe.redirectToCheckout({
        sessionId,
      });
      // Créer une session de paiement sur le backend
      // const paymentRes = await fetch(`/api/events/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ eventId: id, playerId: formData.name }),
      // });

      // if (!paymentRes.ok) {
      //   throw new Error('Failed to create payment session');
      // }
      const updatedEvent = await res.json();
      console.log('Updated event:', updatedEvent);
      // const { sessionId } = await res.json();

      // Rediriger vers la page de paiement
      // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
      // await redirectToCheckout( sessionId);
    } catch (error) {
      console.error('Erreur lors du paiement ou de l\'inscription :', error);
    }
  };

  return (
    <div>
      <h2 className="titre">Inscription à l'événement</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="name" className="block textBlue">Nom :</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4 text-left"
          value={formData.name}
        />
        <label htmlFor="email" className="block textBlue">Email :</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4 text-left"
          value={formData.email}
        />

        <label htmlFor="niveau" className="block textBlue">Niveau :</label>
        <select
          name="niveau"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4"
          value={formData.niveau}>
          <option value="">Estime ton niveau</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire (série 3)">Intermédiaire (série 3)</option>
          <option value="Avancé (série 2)">Avancé (série 2)</option>
          <option value="Expérimenté (série 1)">Expérimenté (série 1)</option>
        </select>

        <label htmlFor="genre" className="block textBlue">Genre :</label>
        <select
          name="genre"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4"
          value={formData.genre}
        >
          <option value="">Masculin ou Féminin</option>
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
        </select>

        <button className="btn btn-outline btn-warning font-emoji mb-6" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
