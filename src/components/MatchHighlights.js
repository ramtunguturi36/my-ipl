import React, { useState } from 'react';
import './MatchHighlights.css';
import axios from 'axios';

const MatchHighlights = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Construct the query string with year
      const query = `give key moments of the match happened between ${team1} and ${team2} on ${year}`;
      const result = await axios.post('http://127.0.0.1:5000/query', { query, type });
      setResponse(result.data.answer);
    } catch (error) {
      console.error('Error querying the backend:', error);
      setResponse('Error querying the backend. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="match-highlights-page">
      <div className="match-highlights-container">
        <h2>Match Highlights Generator</h2>
        <form onSubmit={handleSubmit} className="highlights-form">
          <div className="form-group">
            <label htmlFor="team1">Team 1:</label>
            <input
              type="text"
              id="team1"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Enter first team"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="team2">Team 2:</label>
            <input
              type="text"
              id="team2"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Enter second team"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Highlight Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="batting">Batting</option>
              <option value="bowling">Bowling</option>
              <option value="fielding">Fielding</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Highlights'}
          </button>
        </form>
        <div className="highlights-display">
          <h3>Highlights:</h3>
          {isLoading ? <p>Loading...</p> : <p>{response || 'Please enter the details to generate the match highlights.'}</p>}
        </div>
      </div>
    </div>
  );
};

export default MatchHighlights;
