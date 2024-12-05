// src/pages/trymeon/Product.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../../contexts/TryOnContext';
import axios from 'axios';  // axios 임포트
import { useWishlist } from '../../contexts/WishlistContext';
import '../../styles/trymeon/Product.css';
import wishlistIcon from '../../images/wishlist_rad.png';

const Product = ({ images, onRemove, removingItems = [] }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const { setImageForTryOn } = useTryOn(); // Access the TryOn context
  const { addToWishlist } = useWishlist(); // useWishlist 컨텍스트에서 addToWishlist 함수 가져오기

  const navigate = useNavigate();

  const handleTryOnClick = (image) => {
    setImageForTryOn(image); // Set the selected image for "Try On"
    navigate('/tryon'); // Navigate to the TryOn page
  };

  const handleWishlistClick = async (image) => {
    setClickedIcons(prev => ({
      ...prev,
      [image.id]: true
    }));
  
    try {
      // 프론트엔드에서 보내는 데이터에 사용자 이메일을 추가합니다
      const dataToSend = {
        userEmail: 'user@example.com',  // 예시 이메일, 실제로는 로그인한 사용자의 이메일을 넣어야 함
        productId: image.id,
      };
  
      const response = await axios.post('http://localhost:8080/api/wishlist', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('아이템이 정상적으로 추가되었습니다.', response.data);
  
      addToWishlist(response.data);
    } catch (error) {
      console.error('위시리스트에 아이템을 추가하는 데 실패했습니다:', error);
    }
  
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
