// pages/events/index.tsx
"use client"
import { useEffect, useState } from 'react';
import React from "react";
import Navbar from "../composant/navbar/navbar";
import Footer from "../composant/footer/page";
import Card from "../composant/events/card/page";
import  {Event} from "../types";
import style from "./indexEvent.module.css"


export default function Events()  {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);




  return (
    <div>
      <Navbar />
      <div className={style.contener}>
        <h1 className='titre'>Nos événements</h1>
        <ul className='flex justify-around align-middle p-5'>
          {events.map(event => (
            <li key={event.id}>
              {/* {event.name}  - {event.location?.street} - {event.description} */}

              <Card event={event}/>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};
