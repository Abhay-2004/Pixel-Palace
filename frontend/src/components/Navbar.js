import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/826db7d4-041d-4d4b-b504-396f2cc84c7a/d4hr3a5-bc1bf84b-df9b-4492-ba25-528c37266101.png/v1/fit/w_385,h_384,q_70,strp/pixel_art_icons___my_asus_laptop_by_siberias_d4hr3a5-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mzg0IiwicGF0aCI6IlwvZlwvODI2ZGI3ZDQtMDQxZC00ZDRiLWI1MDQtMzk2ZjJjYzg0YzdhXC9kNGhyM2E1LWJjMWJmODRiLWRmOWItNDQ5Mi1iYTI1LTUyOGMzNzI2NjEwMS5wbmciLCJ3aWR0aCI6Ijw9Mzg1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ekOOyi0YdVqqzk-nprU-o1I6ZNInwLUHg5bFef6wxD0"
            alt="Pixel Palace Logo"
            style={{ width: "29px", height: "auto", marginRight: "20px" }}
          />
          Pixel Palace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/laptops">
                Laptops
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/phones">
                Phones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/info">
                Student Information
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link cart-link" to="/cart">
                🛒 Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
