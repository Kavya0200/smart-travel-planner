import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully!");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#121926', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', width: '400px', textAlign: 'center' }}>
        <h2 style={{ color: '#121926', marginBottom: '20px' }}>Create Account</h2>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }} required />
          <input type="password" placeholder="Password (min 6 chars)" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }} required />
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Signup</button>
        </form>
        <p style={{ marginTop: '20px', color: '#333' }}>Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;