"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Page({}: Props) {
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [location, setLocation] = useState({ street: '', city: '', state: '', zip: '' });
  const [description, setDescription] = useState('');
  const [numberPlaceMen, setNumberPlaceMen] = useState(0);
  const [numberPlaceWomen, setNumberPlaceWomen] = useState(0);
  const [autre, setAutre] = useState('');
  const [players, setPlayers] = useState('');
  const router = useRouter()

  const handleLocationChange = (field: keyof typeof location, value: string) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      [field]: value,
    }));
  };

  const addEvent = async () => {
    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          dateStart,
          dateEnd,
          location,
          description,
          numberPlaceMen,
          numberPlaceWomen,
          autre,
          players: players ? JSON.parse(players) : [],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newEvent = await response.json();
      console.log('New event created:', newEvent);
      router.push(`/events`);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <h2 className='titre'>Nouvel Evénement</h2>
      <div className='flex flex-col items-center'>
        <label htmlFor="text" className="block textBlue">Nom de l'événement:</label>
        <input type="text" placeholder="Name" className="input input-bordered input-info w-full max-w-xs mb-4 text-left" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="text" className="block textBlue">Date du début:</label>
        <input type="date" placeholder="Start Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
        <label htmlFor="text" className="block textBlue">Date de fin:</label>
        <input type="date" placeholder="End Date" className="input input-bordered input-info w-full max-w-xs mb-4" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
        <input type="text" placeholder="Street" className="input input-bordered input-info w-full max-w-xs m-4" value={location.street} onChange={(e) => handleLocationChange('street', e.target.value)} />
        <input type="text" placeholder="City" className="input input-bordered input-info w-full max-w-xs m-4" value={location.city} onChange={(e) => handleLocationChange('city', e.target.value)} />
        <input type="text" placeholder="State" className="input input-bordered input-info w-full max-w-xs m-4" value={location.state} onChange={(e) => handleLocationChange('state', e.target.value)} />
        <input type="text" placeholder="Zip" className="input input-bordered input-info w-full max-w-xs m-4" value={location.zip} onChange={(e) => handleLocationChange('zip', e.target.value)} />
        <textarea className="textarea textarea-info mb-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="number" className="block textBlue">Nombre de joueurs masculins:</label>
        <input type="number" placeholder="Number of Places for Men" className="input input-bordered input-info w-full max-w-xs mb-4" value={numberPlaceMen} onChange={(e) => setNumberPlaceMen(parseInt(e.target.value))} />
        <label htmlFor="number" className="block textBlue">Nombre de joueurs féminins:</label>
        <input type="number" placeholder="Number of Places for Women" className="input input-bordered input-info w-full max-w-xs mb-4" value={numberPlaceWomen} onChange={(e) => setNumberPlaceWomen(parseInt(e.target.value))} />
        <textarea placeholder="Autre" className="textarea textarea-info" value={autre} onChange={(e) => setAutre(e.target.value)} />
        <textarea placeholder="Players (JSON format)" value={players} onChange={(e) => setPlayers(e.target.value)} />
        <button className="btn btn-outline btn-warning font-emoji mr-6" onClick={addEvent}>Ajouter événement</button>
      </div>
    </div>
  );
}
