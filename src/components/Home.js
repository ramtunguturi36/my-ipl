import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/home');
                setData(response.data);
            } catch (error) {
                setError('There was an error fetching the data!');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            <main className="home-main">
                <div className="news-container">
                    <h3>Latest News</h3>
                    {error && <p className="error">{error}</p>}
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <div className="home-box">
                                    <img src={item.ImageURL} alt={item.Heading} className="news-image" />
                                    <div className="home-box-content">
                                        <h2 className="news-heading">{item.Heading}</h2>
                                        <p className="news-subcontent">{item.SubContent}</p>
                                        <Link to={`/HomeInnerPara/${encodeURIComponent(item.InnerPara)}/${encodeURIComponent(item.ImageURL)}`} className="read-more-link">Read more</Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <p className="quote">“You don’t win or lose the games because of the 11 you select. You win or lose with that those 11 do on the field.” – Rahul Dravid.</p>
                    <p className="stay-with-us">Stay with us:</p>
                    <div className="footer-bottom">
                        <div className="social-media-icons">
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="/images/Instagram_logo.png" alt="Instagram" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="/images/Youtube-Icon.png" alt="YouTube" />
                            </a>
                        </div>
                        <button className="contact-us-button" onClick={() => window.location.href = '/ContactUs'}>Contact Us</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
