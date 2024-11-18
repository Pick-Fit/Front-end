// src/pages/WishlistPage.js
import React from 'react';
import "../styles/Basket.css";  // CSS 파일 import
import wishlistIcon from '../images/wishlist2.png';  // 이미지 import

function WishlistPage() {
  return (
    <div className="page-container">
      <div className="header">
        <h1>장바구니</h1>
      </div>
      <div className="divider"></div>
      <div className="body">
      <div className="icon-with-text">
          <img className="icon" src={wishlistIcon} alt="Wishlist Icon" />
          <p className="no-items-text">장바구니에 등록된 상품이 없습니다. <br /> Pick,Fit에서 다양한 상품들을 등록해보세요.</p>
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
