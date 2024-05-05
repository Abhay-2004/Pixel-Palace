import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './login-register.css'; // Import the CSS file

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/login', credentials);
            setMessage('Login successful!');
            navigate('/profile', { state: { user: response.data.user } });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage(error.response.data.message); // Display specific error from backend
            } else {
                setMessage('Login error. Please try again.');
            }
        }
    };
    

    return (
        <div className="login-container"> {/* Apply the login-container class */}
            <Navbar />
            <div className="login-box"> {/* Apply the login-box class */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form"> {/* Apply the login-form class */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control input-field" id="email" name="email" value={credentials.email} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input-field" id="password" name="password" value={credentials.password} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Login</button>
                </form>
                {message && <div className="alert alert-info mt-2">{message}</div>}
            </div>
        </div>
    );
};

export default Login;
