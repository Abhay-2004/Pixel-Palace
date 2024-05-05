import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from "./shop-context";
import '../laptops_style.css';

const LaptopShop = () => {
  const [laptops, setLaptops] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get('http://localhost:8081/laptops');
        setLaptops(response.data);
      } catch (error) {
        console.error('Failed to fetch laptops:', error);
      }
    };
    fetchLaptops();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Explore Our Laptops Collection</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {laptops.map(laptop => (
          <div key={laptop.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={laptop.image} className="card-img-top" alt={laptop.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{laptop.name}</h5>
                <p className="card-text">{laptop.description}</p>
                <p className="card-text"><strong>Price:</strong> ${laptop.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(`laptop_${laptop.id}`)}>
                  Add To Cart {cartItems[`laptop_${laptop.id}`] > 0 && `(${cartItems[`laptop_${laptop.id}`]})`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopShop;