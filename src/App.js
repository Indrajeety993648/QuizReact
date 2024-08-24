import React, { useState } from 'react';
import './App.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import Login from './components/Login';
import Register from './components/Register';
import TestYourKnowledge from './components/TestYourKnowledge';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and registration

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <div className="header-left">
          <h1>QuizApp</h1>
        </div>
        <div className="header-right">
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>
      <main className="main-content">
        {isLoggedIn ? (
          <TestYourKnowledge />
        ) : (
          <div className="form-wrapper">
            {showLogin ? (
              <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowLogin(false)}
              />
            ) : (
              <Register
                onRegister={handleRegister}
                onSwitchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
