import React, { useState } from 'react';
import './ContactUs.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a successful message sending
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setResponse('Message sent successfully!');
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="contact-form-page">
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              required
            ></textarea>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="response-display">
          <h3>Response:</h3>
          {isLoading ? <p>Loading...</p> : <p>{response || 'Fill out the form to send us a message.'}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
