import React from 'react';
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import  {Event} from "../../../types";
import style from "./cardShow.module.css"
import Link from 'next/link';

const prisma = new PrismaClient();

type CardShow = {
  eventData: Event;

};

type Player = {
  id: string;
  name: string;
  paiement: boolean;
  niveau: string;
  genre: string;
  eventId: string;
};
// const nbGenrePlaceDispo = (players:{ [key: string]: Player } , placeGenre:number, genre: string ): number => {
//   // Compte le nombre de joueurs du genre spécifié
//   const playersArray = Object.values(players);
//   const playersGenreCount = playersArray.filter(player => player.genre === genre).length;
//   const genreRest = placeGenre - playersGenreCount
//   return genreRest
// }

export default function cardShow({eventData} : CardShow) {

  // const womenPlaceDIspo = nbGenrePlaceDispo(eventData.players, eventData.numberPlaceWomen, "Féminin")
  // const menPlaceDIspo = nbGenrePlaceDispo(eventData.players, eventData.numberPlaceMen, "Masculin")
  //  let players = Object.entries(eventData.players)

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
          {/* <p><span className='text-7xl font-semibold w-[30%]' >{eventData.numberPlaceMen + eventData.numberPlaceWomen - eventData.players.length}</span> Places restantes / {eventData.numberPlaceMen + eventData.numberPlaceWomen}</p> */}
          <p> <span className='text-4xl w-[20%] h-[72px]'> {eventData.numberPlaceWomen} </span> en féminin </p>
          <p><span className='text-4xl w-[20%]'> {eventData.numberPlaceMen}</span> en masculin</p>
        </div>
        <div >
          <p>{eventData.autre}</p>
          <p>{eventData.description}</p>
          <h4>Joueurs:</h4>
            <ul>
              {eventData.players.map(player => (
                <li key={player.id}>
                  {player.name} - {player.genre} - {player.niveau} - Paiement: {player.paiement ? 'Oui' : 'Non'}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link href={`/events/${eventData.id}/register`} className="btn btn-warning font-emoji m-10 text-xl p-5 border-blue-900 text-blue-900" >Je m'inscris !</Link>
        </div>
      </div>


  )
}
