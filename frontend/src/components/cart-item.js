import React, { useContext } from "react";
import { ShopContext } from "./shop-context";

export const CartItem = (props) => {
  const { id, name, price, image, quantity, showButtons = true } = props.data;
  const { addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      updateCartItemCount(newQuantity, id);
    }
  };

  return (
    <div className="cartItem" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px'}}>
      <img src={image} className="card-img-top" style={{ width: '300px', height: '250px', objectFit: 'cover' }} />
      <div className="description">
        <p> <b>{name}</b> </p>
        <p> Price: ${price}</p>
        {showButtons ? (
          <div className="countHandler">
            <button onClick={() => removeFromCart(id)}> - </button>
            <input value={quantity} onChange={handleQuantityChange} />
            <button onClick={() => addToCart(id)}> + </button>
          </div>
        ) : (
          <div className="itemCount">
            <p>Quantity: {quantity}</p>
          </div>
        )}
      </div>
    </div>
  );
};