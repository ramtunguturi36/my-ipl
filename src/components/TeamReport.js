import React, { useState } from 'react';
import './TeamReport.css';
import axios from 'axios';

const TeamReport = () => {
  const [teamName, setTeamName] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const query = `tell me about ${teamName}`;
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
    <div className="team-report-page">
      <div className="team-report-container">
        <h2>Team Report Generator</h2>
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        </form>
        <div className="report-display">
          <h3>Report:</h3>
          {isLoading ? <p>Loading...</p> : <p>{response || 'Please enter the details to generate the team report.'}</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamReport;
