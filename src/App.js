import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MatchSummary from './components/MatchSummary';
import PlayerReports from './components/PlayerReports';
import MatchHighlights from './components/MatchHighlights';
import TeamReport from './components/TeamReport';
import Chatbot from './components/Chatbot';
import ContactUs from './components/ContactUs';
import HomeInnerPara from './components/HomeInnerPara';
import Login from './components/Login';
import Signup from './components/Signup';
import News from './components/News';
import Banner from './components/Banner';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home'); // Redirect to home page after login
  };

  return (
    <div className="App">
      {isLoggedIn && <Navbar />} {/* Show Navbar only if logged in */}
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin to Login component */}
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/News" element={<News />} />
            <Route path="/MatchSummary" element={<MatchSummary />} />
            <Route path="/PlayerReports" element={<PlayerReports />} />
            <Route path="/MatchHighlights" element={<MatchHighlights />} />
            <Route path="/TeamReports" element={<TeamReport />} />
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/news/:id" element={<HomeInnerPara />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
