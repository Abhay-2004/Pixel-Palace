// confirmation.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { CartItem } from './cart-item';

const CheckoutModal = ({ show, handleClose, cartItems, totalAmount, checkoutData }) => {
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laptopResponse = await axios.get('http://localhost:8081/laptops');
        setLaptops(laptopResponse.data);

        const phoneResponse = await axios.get('http://localhost:8081/phones');
        setPhones(phoneResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCloseAndReload = () => {
    handleClose();
    window.location.reload(); // Reload the page
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thank you for shopping with us!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the checkout data */}
        {checkoutData && (
          <div className="checkout-data">
            <h5>Checkout Details:</h5>
            <p>Full Name: {checkoutData.fullName}</p>
            <p>Email: {checkoutData.email}</p>
            <p>
              Address: {checkoutData.address1}, {checkoutData.city}, {checkoutData.state}, {checkoutData.zip}
            </p>
            {/* Add other form fields as needed */}
          </div>
        )}
        <h5>Items Purchased:</h5>
        <ul>
          {Object.entries(cartItems).map(([itemId, quantity]) => {
            if (quantity > 0) {
              const [itemType, itemIndex] = itemId.split('_');
              const itemData =
                itemType === 'laptop'
                  ? laptops.find((item) => item.id === Number(itemIndex))
                  : phones.find((item) => item.id === Number(itemIndex));

              return (
                <li key={itemId}>
                  <CartItem data={{ ...itemData, id: itemId, quantity, showButtons: false }} />
                </li>
              );
            }
            return null;
          })}
        </ul>
        <p>Total Amount: ${totalAmount}</p>
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleCloseAndReload}>
          Close
        </button>
        {/* You can add a button to proceed with payment or other actions */}
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;