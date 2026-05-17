// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch (e) {
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Unified addToCart function
  const addToCart = (brandName, imageIndex, imageSrc, productName = null) => {
    // Generate a unique ID. If productName exists, use it, otherwise use index.
    const itemId = productName 
      ? `${brandName}-${productName.replace(/\s+/g, '-')}` 
      : `${brandName}-${imageIndex}`;

    const newItem = {
      id: itemId,
      brand: brandName,
      name: productName || `${brandName} Product ${imageIndex + 1}`,
      imageIndex,
      imageSrc,
      quantity: 1,
    };

    setCartItems(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
  };

  const removeItem = id => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) return;
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
