// src/components/Product.js
import React, { useState } from 'react';
import '../../styles/trymeon/Product.css';
import wishlistIcon from '../../images/wishlist_rad.png';
import { useWishlist } from '../../contexts/WishlistContext'; // 위시리스트 컨텍스트 import

const Product = ({ images, onRemove, removingItems = [] }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistClick = (image, event) => {
    // 개별 아이콘에 대한 클릭 상태 토글
    setClickedIcons(prev => ({
      ...prev,
      [image.id]: true
    }));
    
    // onRemove prop이 있다면 (위시리스트 페이지에서) 해당 함수 실행
    if (onRemove) {
      onRemove(image.id);
    } else {
      // 다른 페이지에서는 위시리스트 토글 기능
      const isInWishlist = false; // 실제 구현에서는 wishlist.some()으로 체크
      if (isInWishlist) {
        removeFromWishlist(image.id);
      } else {
        addToWishlist(image);
      }
    }

    // 일정 시간 후 클릭 상태 초기화
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
            <button className="tryon-button">Try On</button>
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
