import React from "react";
import  {Event}  from '../../../types';
import  StyledLink from "../../StyledLink";


type CardProps = {
  event: Event;
};

export default function Card({event}:CardProps) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{event.name}</h2>
    <h2> {new Date(event.dateStart).toLocaleDateString()}-{new Date(event.dateEnd).toLocaleDateString()}</h2>
    <p>{event.description} - {event.autre}</p>
    <p> {event.id}</p>
    <h4>Joueurs:</h4>
              <ul>
                {event.players.map(player => (
                  <li key={player.id}>
                    {player.name}
                  </li>
                ))}
              </ul>
    <div className="card-actions justify-end">
    <StyledLink href={`/events/${event.id}`}>Voir événement </StyledLink>
    </div>
  </div>
</div>
  );
}
