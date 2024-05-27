"use client"
import { FormEvent } from 'react';
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

type Props = {}

export default function updateEventPage (params:Props) {

  const router = useRouter();
  const {id} = router.query
  const [eventData, setEventData] = useState({
  name: '',
  dateStart: '',
  dateEnd: '',
  location: '',
  description: '',
  numberPlaceMen:'',
  numberPlaceWomen: '',
  autre: '',
  players: '',
})

useEffect(() => {

  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      if (response.ok) {
        const eventData = await response.json();
        setEventData(eventData)
      } else {
        console.error('Failed to fetch event data');
      }
    } catch (error) {
      console.error('Failed to fetch event data:', error);
    }
  };

  if (id) {
    fetchEventData()
  }
}, [id]);



  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {


    const response = await fetch('/api/events/${id}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData
      ),
    });
    if (response.ok) {
      router.push(`/events/${id}`)
    } else {
      console.error('Failed to update event');
    }

  } catch (error) {
    console.error('Failed to update event:', error);
  }
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEventData({...eventData, [event.target.name]: event.target.value});
}

  return (
    <div>
      <h1>Update Event</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={eventData.name} onChange={handleChange} />
        </label>
        <label>
          Date Start:
          <input type="date" name="dateStart" value={eventData.dateStart} onChange={handleChange} />
        </label>
        <label>
          Date End:
          <input type="date" name="dateEnd" value={eventData.dateEnd} onChange={handleChange} />
        </label>
        {/* Ajoutez d'autres champs d'événement ici */}
        <button type="submit">Update Event</button>
      </form>
    </div>
  )
}
