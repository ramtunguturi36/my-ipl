import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './ipllogo.jpeg'; // Ensure this path is correct

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = (event) => {
    event.preventDefault();
    const confirmLeave = window.confirm('Do you want to go back to the login page?');
    if (confirmLeave) {
      navigate('/login');
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <a href="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/MatchSummary">MatchSummary</Link>
        <Link to="/PlayerReports">PlayerReport</Link>
        <Link to="/TeamReports">TeamReport</Link>
        <Link to="/MatchHighlights">MatchHighlights</Link>
        <Link to="/Chatbot">ChatBot</Link>
        <Link to="/ContactUs">ContactUs</Link>
      </div>
    </div>
  );
}

export default Navbar;
