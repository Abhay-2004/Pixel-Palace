//authors: prerak@iastate.edu, abhay14@iastate.edu
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import laptops from './laptops_data.json';
import { CartItem } from './cart-item';

const CheckoutModal = ({ show, handleClose, cartItems, totalAmount, checkoutData }) => {
    const handleCloseAndReload = () => {
        handleClose();
        window.location.reload();  // Reload the page
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
                        <p>Address: {checkoutData.address1}, {checkoutData.city}, {checkoutData.state}, {checkoutData.zip}</p>
                        {/* Add other form fields as needed */}
                    </div>
                )}

                <h5>Items Purchased:</h5>
                <ul>
                    {laptops.map((laptop) => {
                        if (cartItems[laptop.id] !== 0) {
                            return <CartItem data={{...laptop, showButtons: false}} key={laptop.id} />;
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
