// src/components/Product.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../../contexts/TryOnContext';
import '../../styles/trymeon/Product.css';
import wishlistIcon from '../../images/wishlist_rad.png';

const Product = ({ images, onRemove, removingItems = [] }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const { setImageForTryOn } = useTryOn(); // Access the TryOn context

  const navigate = useNavigate();

  const handleTryOnClick = (image) => {
    setImageForTryOn(image); // Set the selected image for "Try On"
    navigate('/tryon'); // Navigate to the TryOn page
  };

  const handleWishlistClick = (image, event) => {
    setClickedIcons(prev => ({
      ...prev,
      [image.id]: true
    }));

    setTimeout(() => {
      setClickedIcons(prev => ({
        ...prev,
        [image.id]: false
      }));
    }, 300);
  };

  if (images.length === 0) {
    return <div>선택된 카테고리에 상품이 없습니다.</div>;
  }

  return (
    <div className="product-gallery">
      {images.map((image) => (
        <div 
          key={image.id} 
          className={`image-box ${removingItems.includes(image.id) ? 'removing' : ''}`}
        >
          <img src={image.src} alt={image.name} className="product-image" />
          <div className="image-footer">
            <div className="image-info">
              <span className="image-title">{image.name}</span>
              <span className="image-price">{image.price}</span>
            </div>
            <button className="tryon-button" onClick={() => handleTryOnClick(image)}>
              Try On
            </button>
          </div>
          <div
            className={`wishlist-icon ${clickedIcons[image.id] ? 'clicked' : ''}`}
            onClick={(event) => handleWishlistClick(image, event)}
          >
            <img src={wishlistIcon} alt="Wishlist Icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
