import { createContext, useState } from 'react';
import laptop from './laptops_data.json';
import phone from './phones.json';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // For laptops
  for (let i = 1; i < laptop.length + 1; i++) {
    cart[`laptop_${i}`] = 0;
  }
  // For phones
  for (let i = 1; i < phone.length + 1; i++) {
    cart[`phone_${i}`] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // For laptops
    for (const item in cartItems) {
      if (item.startsWith('laptop_') && cartItems[item] > 0) {
        let itemInfo = laptop.find((product) => product.id === Number(item.split('_')[1]));
        totalAmount += cartItems[item] * Number(itemInfo.price);
      }
    }
    // For phones
    for (const item in cartItems) {
      if (item.startsWith('phone_') && cartItems[item] > 0) {
        let itemInfo = phone.find((product) => product.id === Number(item.split('_')[1]));
        totalAmount += cartItems[item] * Number(itemInfo.price);
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};