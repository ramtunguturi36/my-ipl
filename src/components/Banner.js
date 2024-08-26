import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Welcome to IPL LLM</h1>
        <p>Explore our latest features and updates</p>
        <a href="/login" className="continue-button">Continue</a>
      </div>
    </div>
  );
};

export default Banner;
