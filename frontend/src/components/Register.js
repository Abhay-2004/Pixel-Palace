import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './login-register.css'; // Import the CSS file here

const Register = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/register', user);
            setMessage(`Registration successful! User ID: ${response.data.userId}`);
            setUser({ fullName: '', email: '', password: '' }); // Clear form after successful registration
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error registering user.');
            }
        }
    };

    return (
        <div className="login-container"> {/* Add the login-container class here */}
            <Navbar />
            <div className="container">
                <div className="login-box"> {/* Add the login-box class here */}
                    <h2>Register</h2>
                    <form className="login-form" onSubmit={handleSubmit}> {/* Add the login-form class here */}
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control input-field" id="fullName" name="fullName" value={user.fullName} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control input-field" id="email" name="email" value={user.email} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control input-field" id="password" name="password" value={user.password} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Register</button> {/* Add the submit-btn class here */}
                    </form>
                    {message && <div className="alert alert-info mt-2">{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default Register;
