import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './HomeInnerPara.css';

function HomeInnerPara() {
  const location = useLocation();

  // Parse the query string to get the parameters
  const queryParams = new URLSearchParams(location.search);
  const innerPara = queryParams.get('innerPara');
  const imageUrl = queryParams.get('imageUrl');

  return (
    <div className="home-inner-para-container">
      <header className="home-inner-para-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>News Details</h1>
      </header>
      <div className="home-inner-para-content">
        {imageUrl && <img className="home-inner-para-image" src={decodeURIComponent(imageUrl)} alt="News" />}
        <p className="home-inner-para-text">{decodeURIComponent(innerPara)}</p>
      </div>
    </div>
  );
}

export default HomeInnerPara;
