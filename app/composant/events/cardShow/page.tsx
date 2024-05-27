import React from 'react';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import  {Event} from "../../../types";


const prisma = new PrismaClient();

type CardShow = {
  eventData: Event;
};




export default function cardShow({eventData} : CardShow) {



  return (
    <div className="card card-side bg-base-100 shadow-xl">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
    <div className="card-body">
      <h2 className="card-title">{eventData.name}</h2>
      <h2 className="card-title">{eventData.dateStart.toString()} - {eventData.dateEnd.toString()}</h2>
      <h3> Lieu: {eventData.location?.street} - {eventData.location?.state} {eventData.location?.city}</h3>
      <p>{eventData.description}</p>
      <p>Place disponible : {eventData.numberPlaceMen + eventData.numberPlaceWomen - eventData.players.length}</p>
      <p>Place femme restante : {eventData.numberPlaceWomen}</p>
      <p>Place homme restante : {eventData.numberPlaceMen}</p>
      <p>{eventData.autre}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">S'inscrire</button>
      </div>
    </div>
  </div>
  )
}
