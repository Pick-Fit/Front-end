import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../../contexts/TryOnContext';
import axios from 'axios';
import { useWishlist } from '../../contexts/WishlistContext';
import '../../styles/trymeon/Product.css';
import wishlistRed from '../../images/wishlist_rad.png';
import whishlistBlack from '../../images/wishlist_black.png';
import RecommendationPopup from './RecommendationPopup'; // 팝업 컴포넌트 임포트

const API_URL = process.env.REACT_APP_API_URL;

const Product = ({ images = [], onRemove, removingItems = [] }) => {
  const [clickedIcons, setClickedIcons] = useState({});
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가
  const [hoveredImage, setHoveredImage] = useState(null); // 호버 상태를 이미지별로 관리
  const { setImageForTryOn } = useTryOn();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]); // 추천된 상품들 저장

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
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        
        const dataToSend = {
          productId: image.id,
          title: image.name,
          price: image.price,
          imageUrl: image.src,
          email: userEmail,
          name: userName,
        };
  
        console.log('Data being sent to the server:', dataToSend);
        console.log('User email from localStorage:', userEmail);
  
        const response = await axios.post(
          `${API_URL}/api/wishlist`,
          dataToSend,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Item added successfully to wishlist:', response.data);
        addToWishlist(response.data); // 위시리스트 상태를 업데이트
      } catch (error) {
        console.error('Failed to add item to wishlist:', error);
      }
    } else {
      console.log('Item removed from wishlist:', image.id);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup); // 팝업 상태 토글
  };

  const getRandomRecommendedProducts = (productId) => {
    // 같은 상품 제외
    const recommended = images.filter((image) => image.id !== productId);
    // 랜덤으로 섞기
    const shuffled = recommended.sort(() => 0.5 - Math.random());
    // 4개만 반환
    return shuffled.slice(0, 4);
  };

  const handlePopupOpen = (imageId) => {
    const randomRecommended = getRandomRecommendedProducts(imageId); // 랜덤한 4개 상품 가져오기
    setRecommendedProducts(randomRecommended); // 상태 저장
    togglePopup(); // 팝업 열기
  };

  const TryOnButton = ({ image }) => (
    <button className="tryon-button" onClick={() => handleTryOnClick(image)}>
      Try On
    </button>
  );

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
          {/* 코디 추천 텍스트와 원 추가 */}
          <div className="recommendation-tag" onClick={() => handlePopupOpen(image.id)}>
            <div
              className="circle"
              onMouseEnter={() => setHoveredImage(image.id)} // 마우스 올리기
              onMouseLeave={() => setHoveredImage(null)} // 마우스 떼기
            >
              <span className="recommendation-text">
                {hoveredImage === image.id ? 'click!' : (
                  <>
                    <p className="recommendation-part">코디</p>
                    <p className="recommendation-part">추천</p>
                  </>
                )}
              </span>
            </div>
          </div>

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
            onClick={() => {
              handleWishlistClick(image);
              console.log(`Wishlist state changed for image: ${image.name} (ID: ${image.id})`);
            }}
          >
            <img
              src={clickedIcons[image.id] ? wishlistRed : whishlistBlack}
              alt="Wishlist Icon"
            />
          </div>
        </div>
      ))}

      {/* 팝업 창 표시 */}
      {showPopup && (
  <RecommendationPopup
    onClose={togglePopup}
    recommendedProducts={recommendedProducts}
    TryOnButton={TryOnButton} // Try On 버튼 전달
  />
)}
    </div>
  );
};

export default Product;
