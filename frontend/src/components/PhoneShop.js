import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from "./shop-context";
import '../laptops_style.css'; // Import corresponding CSS for phones

const PhoneShop = () => {
  const [phones, setPhones] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('http://localhost:8081/phones');
        setPhones(response.data);
      } catch (error) {
        console.error('Failed to fetch phones:', error);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Explore Our Phones Collection</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {phones.map(phone => (
          <div key={phone._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={phone.image} className="card-img-top" alt={phone.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{phone.name}</h5>
                <p className="card-text">{phone.description}</p>
                <p className="card-text"><strong>Price:</strong> ${phone.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(`phone_${phone.id}`)}>
                  Add To Cart {cartItems[`phone_${phone.id}`] > 0 && `(${cartItems[`phone_${phone.id}`]})`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneShop;