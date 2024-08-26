import React, { useState } from 'react';
import './MatchSummary.css';
import axios from 'axios';

const MatchSummary = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [year, setYear] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Construct the query string with year
      const query = `give the match summary between ${team1} and ${team2} on ${year}`;
      const result = await axios.post('https://61bc-35-230-50-26.ngrok-free.app/query', { query });
      setResponse(result.data.answer);
    } catch (error) {
      console.error('Error querying the backend:', error);
      setResponse('Error querying the backend. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="match-summary-page">
      <div className="match-summary-container">
        <div className="form-summary-wrapper">
          <div className="form-container">
            <h2>Match Summary Generator</h2>
            <form onSubmit={handleSubmit} className="summary-form">
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
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </button>
            </form>
          </div>
          <div className="summary-display-container">
            <div className="summary-display">
              {isLoading && <div className="loading"><h3>Loading...</h3></div>}
              <h3>Summary:</h3>
              <p>{response || "Please enter the details to generate the match summary."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;
