//authors: prerak@iastate.edu, abhay14@iastate.edu
import React, { useContext } from "react";
import { ShopContext } from "./shop-context";

export const CartItem = (props) => {
  const { id, name, price, image, showButtons = true } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px'}}>
      <img src={image} className="card-img-top" style={{ width: '300px', height: '250px', objectFit: 'cover' }} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
        {showButtons ? (
          <div className="countHandler">
            <button onClick={() => removeFromCart(id)}> - </button>
            <input
              value={cartItems[id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            />
            <button onClick={() => addToCart(id)}> + </button>
          </div>
        ) : (
          <div className="itemCount">
            <p>Quantity: {cartItems[id]}</p>
          </div>
        )}
      </div>
    </div>
  );
};
