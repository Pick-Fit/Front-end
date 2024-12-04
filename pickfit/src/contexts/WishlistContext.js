// src/contexts/WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const addToWishlist = (product) => {
    // 중복 체크 (id로 확인)
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist는 WishlistProvider 내에서 사용해야 합니다.');
  }
  return context;
};