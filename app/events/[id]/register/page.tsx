"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default  function RegisterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    name: '',
    niveau: '',
    genre: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to register');

      const updatedEvent = await res.json();
      console.log('Updated event:', updatedEvent);

      router.push(`/events/${id}`);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  return (
    <div>
      <h2 className="titre">Inscription à l'événement</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="name" className="block textBlue">Nom :</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4 text-left"
          value={formData.name}
        />


<label htmlFor="niveau" className="block textBlue">Niveau :</label>
        <select
          name="niveau"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4"
          value={formData.niveau}
        >
          <option value="">Estime ton niveau</option>
          <option value="male">Débutant</option>
          <option value="female">Intermédiaire (série 3)</option>
          <option value="female">Avancé (série 2)</option>
          <option value="female">Expériementé (série 1)</option>
        </select>


        <label htmlFor="genre" className="block textBlue">Genre :</label>
        <select
          name="genre"
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs mb-4"
          value={formData.genre}
        >
          <option value="">Masculin ou Féminin</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
        </select>

        <button className="btn btn-outline btn-warning font-emoji mb-6" type="submit">S'inscrire</button>
      </form>
    </div>
  );
};
