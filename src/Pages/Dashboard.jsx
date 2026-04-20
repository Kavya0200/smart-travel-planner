import React, { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchTrips(user.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchTrips = async (uid) => {
    const q = query(collection(db, "trips"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const tripsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTrips(tripsData);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#121926', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>Welcome to Smart Travel Planner</h1>
      <p style={{ color: '#9ca3af', marginBottom: '40px' }}>Logged in as: {user?.email}</p>

      <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px', padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Your Trips</h2>
        
        {trips.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {trips.map(trip => (
              <li key={trip.id} style={{ background: '#111827', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
                {trip.destination} - {trip.date}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#9ca3af', marginBottom: '20px' }}>No trips planned yet. Start planning now!</p>
        )}

        {/* IKKADA UNDI MAIN LOGIC - navigate use chesa */}
        <button 
          onClick={() => navigate('/create-trip')} 
          style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Create New Trip
        </button>
      </div>

      <button 
        onClick={handleLogout}
        style={{ marginTop: '30px', backgroundColor: 'transparent', color: '#f87171', border: '1px solid #f87171', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;