import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Profile = () => {
    const [actionType, setActionType] = useState('');
    const [id, setId] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: ''
    });
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({
        fullName: 'John Doe', // Placeholder, replace with actual user data from login
        email: 'john@example.com' // Placeholder, replace with actual user data from login
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            imageUrl: ''
        });
        setId('');
        setMessage('');
    };

    const selectAction = (type) => {
        resetForm();
        setActionType(type);
    };

    const fetchItem = async (type) => {
        try {
            const response = await axios.get(`http://localhost:8081/${type}s/${id}`);
            setFormData(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Item not found');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = actionType.split(' ')[1].toLowerCase(); // 'Laptop' or 'Phone'
        const url = `http://localhost:8081/${type}s/${id}`;

        try {
            if (actionType.startsWith('Update')) {
                await axios.put(url, formData);
                setMessage('Item updated successfully!');
            } else if (actionType.startsWith('Delete')) {
                await axios.delete(url);
                setMessage('Item deleted successfully!');
            } else {
                await axios.post(`http://localhost:8081/${type}s`, formData);
                setMessage('Item added successfully!');
            }
            resetForm();
        } catch (error) {
            setMessage(`Failed to ${actionType.toLowerCase()} item.`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1>Welcome, {user.fullName}!</h1>
                <p>Your email: {user.email}</p>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Manage Listings
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" onClick={() => selectAction('Add Laptop')}>Add Laptop</button></li>
                        <li><button className="dropdown-item" onClick={() => selectAction('Add Phone')}>Add Phone</button></li>
                        <li><button className="dropdown-item" onClick={() => selectAction('Update Laptop')}>Update Laptop</button></li>
                        <li><button className="dropdown-item" onClick={() => selectAction('Update Phone')}>Update Phone</button></li>
                        <li><button className="dropdown-item" onClick={() => selectAction('Delete Laptop')}>Delete Laptop</button></li>
                        <li><button className="dropdown-item" onClick={() => selectAction('Delete Phone')}>Delete Phone</button></li>
                    </ul>
                </div>

                {(actionType.startsWith('Add') || actionType.startsWith('Update')) && (
                    <form onSubmit={handleSubmit} className="mt-3">
                        {actionType.startsWith('Update') && (
                            <div className="mb-3">
                                <label>Enter ID:
                                    <input type="text" className="form-control" value={id} onChange={handleIdChange} required />
                                </label>
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price:</label>
                            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image URL:</label>
                            <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-success">{actionType.split(' ')[0]}</button>
                    </form>
                )}

                {actionType.startsWith('Delete') && (
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <label>Enter ID to delete:
                                <input type="text" className="form-control" value={id} onChange={handleIdChange} required />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
                )}

                {message && <div className="alert alert-info">{message}</div>}
            </div>
        </div>
    );
};

export default Profile;
