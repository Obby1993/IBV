import React from 'react';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import  {Event} from "../../../types";
import style from "./cardShow.module.css"

const prisma = new PrismaClient();

type CardShow = {
  eventData: Event;

};




export default function cardShow({eventData} : CardShow) {


   let players = Object.entries(eventData.players)

  return (
    <div className="card card-side bg-base-100 shadow-xl ">
      <figure className='align-top w-[30%] h-[600px]'><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
      <div className="card-body">
        <div className={style.head}>
          <h2 className="titre">{eventData.name}</h2>
          <h2 className={style.dateStage}>{new Date(eventData.dateStart).toLocaleDateString()} - {new Date(eventData.dateEnd).toLocaleDateString()}</h2>
        </div>
        <h3> Lieu: {eventData.location?.street} - {eventData.location?.state} {eventData.location?.city}</h3>
        <div className={style.disponibilite}>
          <p><span className='text-7xl font-semibold w-[30%]' >{eventData.numberPlaceMen + eventData.numberPlaceWomen - players.length}</span> Places disponibles</p>
          <p> <span className='text-4xl w-[20%] h-[72px]'> {eventData.numberPlaceWomen} </span> en féminin </p>
          <p><span className='text-4xl w-[20%]'> {eventData.numberPlaceMen}</span> en masculin</p>
        </div>
        <div >
          <p>{eventData.autre}</p>
          <p>{eventData.description}</p>
          <ul>     {players.map(([player, isPlaying], index) => (
              <li key={index}>
                {player} - {isPlaying ? 'A payé' : 'Ne joue pas'}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">S'inscrire</button>
        </div>
      </div>
    </div>

  )
}
