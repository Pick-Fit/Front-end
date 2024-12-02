// src/pages/WishlistPage.js
import React, { useState } from 'react';
import "../styles/Wishlist.css";
import wishlistIcon from '../images/wishlist2.png';
import { useWishlist } from '../contexts/WishlistContext';
import Product from '../pages/trymeon/Product'; // 기존 Product 컴포넌트 import

function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  // 제거 중인 아이템의 ID를 추적하는 상태 추가
  const [removingItems, setRemovingItems] = useState([]);

  // 개별 위시리스트 항목 삭제 핸들러 추가
  const handleRemoveWishlistItem = (imageId) => {
    // 제거 애니메이션을 위해 removingItems에 추가
    setRemovingItems(prev => [...prev, imageId]);

    // 애니메이션 지속 시간 후 실제 아이템 제거
    setTimeout(() => {
      removeFromWishlist(imageId);
      // 제거 완료 후 removingItems에서 해당 ID 제거
      setRemovingItems(prev => prev.filter(id => id !== imageId));
    }, 300); // CSS 애니메이션 지속 시간과 일치
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>Wishlist</h1>
        {wishlist.length > 0 && (
          <button 
            className="clear-wishlist-button"
            onClick={clearWishlist}
          >
            전체 삭제
          </button>
        )}
      </div>
      <div className="divider"></div>
      <div className="body">
        {wishlist.length === 0 ? (
          <div className="icon-with-text">
            <img className="icon" src={wishlistIcon} alt="Wishlist Icon" />
            <p className="no-items-text">
              WishList에 등록된 상품이 없습니다. <br /> 
              Pick,Fit에서 다양한 상품들을 등록해보세요.
            </p>
          </div>
        ) : (
          <div className="wishlist-products">
            <Product 
              images={wishlist} 
              onRemove={handleRemoveWishlistItem}
              removingItems={removingItems} // 제거 중인 아이템 정보 전달
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;