import React, { useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trips"), {
        destination,
        date,
        userId: auth.currentUser.uid,
        createdAt: new Date()
      });
      alert("Trip Added Successfully!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Error adding trip: ", err);
    }
  };

  return (
    <div style={{ backgroundColor: '#121926', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1f2937', padding: '30px', borderRadius: '12px', width: '350px' }}>
        <h2>Plan New Trip</h2>
        <form onSubmit={handleCreateTrip}>
          <input 
            type="text" placeholder="Destination" 
            onChange={(e) => setDestination(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none' }} required 
          />
          <input 
            type="date" 
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none' }} required 
          />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Trip
          </button>
        </form>
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: '10px', background: 'none', color: '#9ca3af', border: 'none', cursor: 'pointer', width: '100%' }}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateTrip;