import React, { useState } from 'react';
import './Form.css'; // Optional: to style your forms

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual login logic
    console.log('Logging in with', email, password);
    onLogin(); // Call the callback to indicate successful login
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="form-switch">
        Don't have an account? <button onClick={onSwitchToRegister}>Register</button>
      </p>
    </div>
  );
};

export default Login;
