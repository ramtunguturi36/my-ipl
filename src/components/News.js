import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './News.css';

const News = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNews(response.data);
            } catch (error) {
                setError('Failed to fetch news.');
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-container">
            <header className="news-header">
                <h1>News</h1>
            </header>
            <main className="news-main">
                {error && <p className="error-message">{error}</p>}
                <ul className="news-list">
                    {news.map((item, index) => (
                        <li key={index} className="news-item">
                            <img src={item.ImageURL} alt={item.Heading} className="news-image" />
                            <div className="news-content">
                                <h2 className="news-title">{item.Heading}</h2>
                                <p className="news-summary">{item.SubContent}</p>
                                <Link 
    to={`/news/${item.id}?innerPara=${encodeURIComponent(item.InnerPara)}&imageUrl=${encodeURIComponent(item.ImageURL)}`} 
    className="read-more-link"
>
    Read more
</Link>

                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default News;
