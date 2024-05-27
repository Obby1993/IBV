"use client"
import { Event } from "../../types";
import CardShow from "../../composant/events/cardShow/page";
import { useState } from 'react';
import axios from 'axios';

//Récupération des données de l'événement
async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  console.log(id);

  if (!res.ok) {
    console.error('Failed to fetch event:', res.statusText);
    throw new Error('Failed to fetch event data');
  }

  const data = await res.json();
  console.log('Event data:', data);
  return data;
}

interface EventPageProps {
  params: {
    id: string;
  };
}


//Mise en place du btn DELETE



export default async function EventPage({ params }: EventPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const event = await fetchEvent(params.id);

  const handleDeleteEvent = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage(null);
    const event = await fetchEvent(params.id);
    if (!event) {
      return <div>Loading...</div>;
    }


  // console.log(params);


  try {
    // Envoyer une requête DELETE à votre API
    const response = await axios.delete(`/api/events/${params.id}`);
    setSuccessMessage(response.data.message);
  } catch (error) {
    setError('Une erreur s\'est produite lors de la suppression de l\'événement.');
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div>
      <CardShow eventData={event}/>
      <div>
      {isLoading && <p>Suppression en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <button
        onClick={handleDeleteEvent}
        className="btn btn-red"
        disabled={isLoading}
      >
        Supprimer l'événement
      </button>
    </div>
    </div>
  );
}
