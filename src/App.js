import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import GardenPlanner from './components/pages/GardenPlanner';
import PlantTracker from './components/pages/PlantTracker';
import Community from './components/pages/Community';
import GardenTips from './components/pages/GardenTips';
import Chatbot from './components/pages/Chatbot';
import Profile from './components/pages/Profile';
import TeraceFarming from './components/pages/TeraceFarming';
import Weather from './components/pages/Weather';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup onSignup={() => setIsLoggedIn(true)} />} />
            <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onLogout={handleLogout} />
          <main className="main-content">
            <Routes>
              <Route path="/garden-planner" element={<GardenPlanner />} />
              <Route path="/plant-tracker" element={<PlantTracker />} />
              <Route path="/community" element={<Community />} />
              <Route path="/garden-tips" element={<GardenTips />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/terrace-farming" element={<TeraceFarming />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/" element={<GardenPlanner />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 