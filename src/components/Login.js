import React, { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaQuestion(`${num1} + ${num2} = ?`);
        setCaptchaAnswer(num1 + num2);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (parseInt(captchaInput) !== captchaAnswer) {
            setError('Incorrect CAPTCHA. Please try again.');
            generateCaptcha();
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT token
                console.log('Login successful');
                onLogin(); // Call onLogin function to update the state in App.js
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="captcha">Captcha: {captchaQuestion}</label>
                    <input
                        type="text"
                        id="captcha"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="extra-options">
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/signup">New User? Sign Up</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
