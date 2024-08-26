import React, { useState } from 'react';
import './PlayerReport.css';
import axios from 'axios';

const PlayerReports = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerStyle, setPlayerStyle] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Construct the query string
      const query = `tell me about ${playerName}`;
      const result = await axios.post('https://61bc-35-230-50-26.ngrok-free.app/query', { query });
      setResponse(result.data.answer);
    } catch (error) {
      console.error('Error querying the backend:', error);
      setResponse('Error querying the backend. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="player-reports-page">
      <div className="player-reports-container">
        <h2>Player Report Generator</h2>
        <form onSubmit={handleSubmit} className="reports-form">
          <div className="form-group">
            <label htmlFor="playerName">Player Name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter player name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="playerStyle">Player Style:</label>
            <select
              id="playerStyle"
              value={playerStyle}
              onChange={(e) => setPlayerStyle(e.target.value)}
              required
            >
              <option value="">Select style</option>
              <option value="batter">Batter</option>
              <option value="bowler">Bowler</option>
              <option value="allrounder">All-rounder</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        </form>
        <div className="report-display">
          <h3>Report:</h3>
          {isLoading ? <p>Loading...</p> : <p>{response || 'Please enter the details to generate the player report.'}</p>}
        </div>
      </div>
    </div>
  );
};

export default PlayerReports;
