import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './ipllogo.jpeg'; // Ensure this path is correct relative to Navbar.js

const Navbar = () => {
  const navigate = useNavigate(); // Use the navigate hook directly

  const handleLogoClick = (event) => {
    event.preventDefault();
    const confirmLeave = window.confirm('Do you want to go back to the login page?');
    if (confirmLeave) {
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <a href="/" className="navbar-brand" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/MatchSummary" className="nav-link">MatchSummary</Link>
            </li>
            <li className="nav-item">
              <Link to="/PlayerReports" className="nav-link">PlayerReport</Link>
            </li>
            <li className="nav-item">
              <Link to="/TeamReports" className="nav-link">TeamReport</Link>
            </li>
            <li className="nav-item">
              <Link to="/MatchHighlights" className="nav-link">MatchHighlights</Link>
            </li>
            <li className="nav-item">
              <Link to="/Chatbot" className="nav-link">ChatBot</Link>
            </li>
            <li className="nav-item">
              <Link to="/ContactUs" className="nav-link">ContactUs</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
