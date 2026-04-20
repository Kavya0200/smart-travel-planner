import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError("Invalid Email or Password. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: '#121926', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', width: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h1 style={{ color: '#121926', fontSize: '32px', margin: '0' }}>Smart Travel</h1>
        <h1 style={{ color: '#121926', fontSize: '32px', marginTop: '0', marginBottom: '10px' }}>Planner</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Login to continue your trip planning</p>
        
        {error && <p style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }}
            required 
          />
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
        
        <p style={{ marginTop: '25px', fontSize: '14px', color: '#333' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;