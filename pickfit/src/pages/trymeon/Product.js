import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../../contexts/TryOnContext';
import axios from 'axios';
import { useWishlist } from '../../contexts/WishlistContext';
import '../../styles/trymeon/Product.css';
import wishlistRed from '../../images/wishlist_rad.png';
import whishlistBlack from '../../images/wishlist_black.png';

const Product = ({ images, onRemove, removingItems = [] }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const { setImageForTryOn } = useTryOn();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleTryOnClick = (image) => {
    setImageForTryOn(image);
    navigate('/tryon');
  };

  const handleWishlistClick = async (image) => {
    const isCurrentlyRed = clickedIcons[image.id] || false; // 현재 상태 확인

    // 상태 토글
    setClickedIcons((prev) => ({
      ...prev,
      [image.id]: !isCurrentlyRed, // 현재 상태의 반대로 변경
    }));

    if (!isCurrentlyRed) {
      // wishlistRed로 변환되는 경우 서버에 추가 요청
      try {
        const dataToSend = {
          userEmail: 'user@example.com', // Replace with actual logged-in user email
          productId: image.id,
        };

        const response = await axios.post('http://localhost:8080/api/wishlist', dataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Item added successfully to wishlist:', response.data);
        addToWishlist(response.data);
      } catch (error) {
        console.error('Failed to add item to wishlist:', error);
      }
    } else {
      // whishlistBlack로 변환되는 경우 (추가적으로 삭제 로직 구현 가능)
      console.log('Item removed from wishlist:', image.id);
    }
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
              <span className="image-price">$ {image.price}</span>
            </div>
            <button className="tryon-button" onClick={() => handleTryOnClick(image)}>
              Try On
            </button>
          </div>
          <div
            className={`wishlist-icon ${clickedIcons[image.id] ? 'clicked' : ''}`}
            onClick={() => handleWishlistClick(image)}
          >
            <img
              src={clickedIcons[image.id] ? wishlistRed : whishlistBlack}
              alt="Wishlist Icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
