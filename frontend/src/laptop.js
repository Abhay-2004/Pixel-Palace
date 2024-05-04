//authors: prerak@iastate.edu, abhay14@iastate.edu
import React, { useContext } from "react";
import { ShopContext } from "./shop-context";

export const Laptop = (props) => {
  const { id, name, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <main className="container mt-4 main-content">
    <div className="laptop">
      <img src={image} className="card-img-top" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
    </main>
  );
};