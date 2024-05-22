import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';



interface TypeCoachData {
  id: number;
  name: string;
  picture: string;
  palmares: { year: number; achievement: string; }[];
  devise: string;
}

export default function Coach({coachData}: { coachData: TypeCoachData }) {
  return (
    <div className="hero place-items-start  " key={coachData.id}>
                  <h1 className="titre" >{coachData.name}</h1>
            <div className="hero-content flex-col lg:flex-row" >
                <img src={coachData.picture} className=" rounded-lg shadow-2xl" style={{ width: '205x',height:'350px' }} />
                <div style={{ width: '60%', height:'350px' }}>
                  <p className="py-6 text-white">{coachData.devise}</p>
                  <h2 style={{textDecoration: 'underline', color:'white', fontWeight:'bolder'}}>Palmarès:</h2>
                  <ul>
                        {coachData.palmares.map((palmares, index) => (
                          <li key={index} className="text-white">
                             <FontAwesomeIcon icon={faMedal} style={{color: '#FAB03E'}} />         {palmares.year}: {palmares.achievement}
                          </li>
                        ))}
                  </ul>
                </div>
            </div>
      </div>
  );
};
