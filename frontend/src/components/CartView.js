import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from './shop-context';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './cart-item';
import '../laptops_style.css';
import CheckoutModal from './confirmation.js';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
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
    zip: '',
  });

  const [errors, setErrors] = useState({});
  const [checkoutFormData, setCheckoutFormData] = useState(null);
  const [cartItemsData, setCartItemsData] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const itemPromises = Object.keys(cartItems).map(async (itemId) => {
          if (itemId.startsWith('laptop_')) {
            const laptopId = itemId.split('_')[1];
            const response = await axios.get(`http://localhost:8081/laptops/${laptopId}`);
            return { ...response.data, id: itemId, quantity: cartItems[itemId] };
          } else if (itemId.startsWith('phone_')) {
            const phoneId = itemId.split('_')[1];
            const response = await axios.get(`http://localhost:8081/phones/${phoneId}`);
            return { ...response.data, id: itemId, quantity: cartItems[itemId] };
          }
        });

        const items = await Promise.all(itemPromises);
        setCartItemsData(items.filter(Boolean));
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(formData.cardNumber)) {
      validationErrors.cardNumber = 'Invalid card number';
    }

    const zipRegex = /^[0-9]{5}$/;
    if (!zipRegex.test(formData.zip)) {
      validationErrors.zip = 'Invalid zip code';
    }

    const requiredFields = ['fullName', 'email', 'cardNumber', 'cardName', 'address1', 'city', 'state', 'zip', 'cvv', 'expiration'];
    requiredFields.forEach((field) => {
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

    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <div className="cart">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px' }}>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {cartItemsData.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </div>

        {totalAmount > 0 ? (
          <div className="checkout">
            <p>Subtotal: ${totalAmount}</p>
            <Button variant="primary" type="submit" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>{' '}
          </div>
        ) : (
          <h1>Your Shopping Cart is Empty</h1>
        )}
        {checkoutFormData && (
          <div className="checkout-data">
            <h2>Checkout Details</h2>
            <p>Full Name: {checkoutFormData.fullName}</p>
            <p>Email: {checkoutFormData.email}</p>
            <p>
              Address: {checkoutFormData.address1}, {checkoutFormData.city}, {checkoutFormData.state}, {checkoutFormData.zip}
            </p>
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
