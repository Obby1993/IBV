// pages/events/index.tsx
"use client"
import { useEffect, useState } from 'react';
import React from "react";
import Navbar from "../composant/navbar";


interface Event {
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  description: string;
  numberPlaceMen: number;
  numberPlaceWomen: number;
  autre: string;
  players: any;
}

export default function Events()  {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [numberPlaceMen, setNumberPlaceMen] = useState(0);
  const [numberPlaceWomen, setNumberPlaceWomen] = useState(0);
  const [autre, setAutre] = useState('');
  const [players, setPlayers] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const addEvent = async () => {
    const response = await fetch('/api/events', {
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
        players: JSON.parse(players),
      }),
    });
    const newEvent = await response.json();
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <Navbar />
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {new Date(event.dateStart).toLocaleDateString()} - {event.location} - {event.description}
          </li>
        ))}
      </ul>
      <h2>Add Event</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={dateStart}
        onChange={(e) => setDateStart(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={dateEnd}
        onChange={(e) => setDateEnd(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Places for Men"
        value={numberPlaceMen}
        onChange={(e) => setNumberPlaceMen(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Number of Places for Women"
        value={numberPlaceWomen}
        onChange={(e) => setNumberPlaceWomen(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Autre"
        value={autre}
        onChange={(e) => setAutre(e.target.value)}
      />
      <textarea
        placeholder="Players (JSON format)"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
      />
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};
