//authors: prerak@iastate.edu, abhay14@iastate.edu

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from './shop-context';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './cart-item';
import laptops from './laptops_data.json';
import './laptops_style.css'
import CheckoutModal from './confirmation.js';
import { Card, Form, Button } from 'react-bootstrap';

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    
    event.preventDefault(); // Prevent default form submission
    setShowModal(true);
  };
  
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = React.useState({});
  const [checkoutFormData, setCheckoutFormData] = React.useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Clear the error for the changed field
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const validationErrors = {};
  
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
  
    // Card number validation
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(formData.cardNumber)) {
      validationErrors.cardNumber = 'Invalid card number';
    }
  
    // Zip code validation
    const zipRegex = /^[0-9]{5}$/;
    if (!zipRegex.test(formData.zip)) {
      validationErrors.zip = 'Invalid zip code';
    }
  
    // Other required fields validation
    const requiredFields = ['fullName', 'email', 'cardNumber', 'cardName', 'address1', 'city', 'state', 'zip', 'cvv','expiration' ];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        validationErrors[field] = 'Required';
      }
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setCheckoutFormData(formData);
    handleShowModal(event);

    // Handle form submission (e.g., send data to server)
    console.log('Form submitted:', formData);
  };
  
  

  return (
    <div>
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

      <div className="cart">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px' }}>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {laptops.map((laptop) => {
            if (cartItems[laptop.id] !== 0) {
              return <CartItem data={laptop} key={laptop.id} />;
            }
            return null; // Ensure to return null if the condition is not met
          })}
        </div>

        {totalAmount > 0 ? (
          <div className="checkout">
            <p> Subtotal: ${totalAmount} </p>
            <Button variant="primary" type="submit" onClick={() => navigate("/")}> Continue Shopping </Button>{" "}
          </div>
        ) : (
          <h1>Your Shopping Cart is Empty</h1>
        )}
        {checkoutFormData && (
        <div className="checkout-data">
          <h2>Checkout Details</h2>
          <p>Full Name: {checkoutFormData.fullName}</p>
          <p>Email: {checkoutFormData.email}</p>
          <p>Address: {checkoutFormData.address1}, {checkoutFormData.city}, {checkoutFormData.state}, {checkoutFormData.zip}</p>
        </div>
      )}

        <CheckoutModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        cartItems={cartItems} 
        totalAmount={totalAmount} 
        checkoutData={checkoutFormData}
      />

<Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFullName">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
        isInvalid={!!errors.fullName}
        maxLength={50}
      />
      <Form.Control.Feedback type="invalid">
        {errors.fullName}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john.doe@example.com"
        isInvalid={!!errors.email}
        maxLength={50}
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formAddress1">
      <Form.Label>Address Line 1</Form.Label>
      <Form.Control
        type="text"
        name="address1"
        value={formData.address1}
        onChange={handleChange}
        placeholder="123 Main St"
        isInvalid={!!errors.address1}
        maxLength={100}
      />
      <Form.Control.Feedback type="invalid">
        {errors.address1}
      </Form.Control.Feedback>
    </Form.Group>

    <div className="row">
      <div className="col-md-4">
        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Anytown"
            isInvalid={!!errors.city}
            maxLength={50}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="col-md-4">
        <Form.Group controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="CA"
            isInvalid={!!errors.state}
            maxLength={2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="col-md-4">
        <Form.Group controlId="formZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="12345"
            isInvalid={!!errors.zip}
            maxLength={5}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234567890123456"
                maxLength={16}
                isInvalid={!!errors.cardNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Similarly, repeat the pattern for other form fields */}
            <Form.Group className="mb-3" controlId="formCardName">
              <Form.Label>Cardholder's Name</Form.Label>
              <Form.Control
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                isInvalid={!!errors.cardName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardName}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="formExpiration">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    isInvalid={!!errors.expiration}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiration}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="345"
                    maxLength={3}
                    isInvalid={!!errors.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
              <Button variant="primary" type="submit">Checkout</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
