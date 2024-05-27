// types.ts
export interface Event {
  id: string;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null;
  description: string;
  numberPlaceMen: number;
  numberPlaceWomen: number;
  autre: string;
  players: any;
}

// Ajoutez d'autres types ici
export interface User {
  id: string;
  name: string;
  email: string;
  // autres propriétés
}
