import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import Home from './components/Home';
import LaptopShop from './components/LaptopShop';
import PhoneShop from './components/PhoneShop';
import Login from './components/Login';
import Register from './components/Register';
import { Cart } from './components/CartView';
import StudentInfo from './components/StudentInfo';
import { ShopContextProvider } from './components/shop-context';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laptops" element={<LaptopShop />} />
          <Route path="/phones" element={<PhoneShop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/info" element={<StudentInfo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer  path="/footer" element={<Footer />}/>
      </ShopContextProvider>
    </Router>
  );
}

export default App;
