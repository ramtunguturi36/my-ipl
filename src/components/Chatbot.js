import React, { useState } from 'react';
import './Chatbot.css';
import axios from 'axios';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    // Add user query to messages
    const userMessage = { sender: 'user', text: query };
    setMessages([...messages, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      // Updated endpoint URL
      const result = await axios.post('http://127.0.0.1:5000/query', { query });

      const botMessage = { sender: 'bot', text: result.data.answer };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error querying the backend:', error);
      const errorMessage = { sender: 'bot', text: 'Error querying the backend. Please try again later.' };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot typing-indicator">
              <p>Bot is typing...</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your message..."
            required
          />
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
