import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for programmatic navigation

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to manage button and spinner
  const [error, setError] = useState(''); // Error state for error messages
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Store the token after login
const handleLogin = async (e) => {
    e.preventDefault();
  
    const res = await fetch('https://smartfitbackend.onrender.com/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await res.json();
  
    if (data.token) {
      // Store JWT token in localStorage
      localStorage.setItem('auth_token', data.token);
  
      // Redirect to the Admin page
      navigate('/admin');
    } else {
      alert('Invalid credentials!');
    }
  };
  
  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Login</h2>
        
        {/* Displaying any error messages */}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input
            className="admin-input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="admin-input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          
          {/* Disable the button while loading */}
          <button
            className="admin-login-button"
            type="submit"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Show loading text while logging in */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
