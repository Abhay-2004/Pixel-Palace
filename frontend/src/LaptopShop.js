//authors: prerak@iastate.edu, abhay14@iastate.edu
import React, { useState, useEffect, useContext } from 'react';
import './laptops_style.css'; // Import your CSS here
import Laptops from './laptops_data.json'
import { Link } from 'react-router-dom';
import { ShopContext } from "./shop-context";
import { Laptop } from './laptop.js'; // Adjust the path as necessary


export const LaptopShop = () => {
  return (
    <>
      {/* Your meta tags here */}
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          {/* Your navbar content here */}
          <a className="navbar-brand">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/826db7d4-041d-4d4b-b504-396f2cc84c7a/d4hr3a5-bc1bf84b-df9b-4492-ba25-528c37266101.png/v1/fit/w_385,h_384,q_70,strp/pixel_art_icons___my_asus_laptop_by_siberias_d4hr3a5-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mzg0IiwicGF0aCI6IlwvZlwvODI2ZGI3ZDQtMDQxZC00ZDRiLWI1MDQtMzk2ZjJjYzg0YzdhXC9kNGhyM2E1LWJjMWJmODRiLWRmOWItNDQ5Mi1iYTI1LTUyOGMzNzI2NjEwMS5wbmciLCJ3aWR0aCI6Ijw9Mzg1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ekOOyi0YdVqqzk-nprU-o1I6ZNInwLUHg5bFef6wxD0"
              alt="Pixel Palace Logo"
              style={{ width: '29px', height: 'auto', marginRight: '20px' }}
            />
            Pixel Palace
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
              <Link to="/" className="navbar-link"> Laptops </Link>
              </li>
            </ul>
            <ul className="navbar-nav flex-row-reverse">
              <li className="nav-item">
                <button className='cart-link'>
              <Link to="/cart" className="navbar-link">🛒Cart</Link>
              </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
  <h1 className="mb-4 text-center">Explore Our Laptops Collection</h1>
  <div className="row row-cols-1 row-cols-md-3 g-4">
  {Laptops.map((laptop) => (
          <Laptop data={laptop} />
        ))}
      </div>
  </main>


      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© Pixel Palace; all rights reserved</p>
        </div>
      </footer>
    </>
  );
}

export default LaptopShop;
