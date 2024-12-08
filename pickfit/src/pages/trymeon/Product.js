import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../../contexts/TryOnContext';
import axios from 'axios';
import '../../styles/trymeon/Product.css';
import wishlistRed from '../../images/wishlist_rad.png';
import whishlistBlack from '../../images/wishlist_black.png';
import RecommendationPopup from './RecommendationPopup';

const API_URL = process.env.REACT_APP_API_URL;

const Product = ({ images = [], removingItems = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIcons, setClickedIcons] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { setImageForTryOn } = useTryOn();
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [user, setUser] = useState({ email: '', name: '' });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // 사용자 정보 로드
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    setUser({
      email: storedEmail || '',
      name: storedName || '',
    });
  }, []);

  // Fetch initial wishlist from server
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/wishlist/${user.email}`);
        const wishlistData = response.data?.data || [];
        setWishlist(wishlistData);

        const iconsState = wishlistData.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {});
        setClickedIcons(iconsState);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error.message);
      }
    };

    if (user.email) {
      fetchWishlist();
    }
  }, [user.email]);

  const handleTryOnClick = (image) => {
    setImageForTryOn(image);
    navigate('/tryon');
  };

  const handlePopupOpen = (imageId) => {
    const randomRecommended = images.filter(image => image.id !== imageId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRecommendedProducts(randomRecommended);
    setShowPopup(true);
  };

  const handleWishlistClick = async (e, image) => {
    e.stopPropagation();
    console.log("📌 위시리스트 아이콘 클릭됨");
    console.log("🔍 로딩 상태 확인 (이벤트 시작):", isLoading);
  
    if (isLoading) {
      console.log("⏳ 로딩 중입니다. 중복 클릭 방지.");
      return;
    }
    
    setIsLoading(true);
    console.log("🚀 로딩 상태를 true로 설정");
  
    try {
      const isCurrentlyRed = clickedIcons[image.id] || false; 
      console.log("🔴 현재 빨간 상태 확인:", isCurrentlyRed);
  
      if (isCurrentlyRed) {
        console.log("🗑️ DELETE 요청을 보냅니다...");
        const response = await axios.delete(
          `${API_URL}/user/products/${image.id}`,
          { data: { userEmail: user.email } } // Request body에 이메일 전달
        );
  
        console.log("✅ DELETE 요청 응답:", response);
  
        setClickedIcons(prev => {
          console.log("🔄 상태 삭제 전:", prev);
          const updatedIcons = { ...prev };
          delete updatedIcons[image.id];
          console.log("🛑 삭제 후 상태:", updatedIcons);
          return updatedIcons;
        });
  
        setWishlist(prev => {
          console.log("🔄 삭제 전 상태 확인:", prev);
          const newWishlist = prev.filter(item => item.productId !== image.id);
          console.log("✅ 삭제 후 위시리스트 상태:", newWishlist);
          return newWishlist;
        });
      } else {
        console.log("📤 POST 요청을 보냅니다...");
        const response = await axios.post(`${API_URL}/api/wishlist`, {
          productId: image.id,
          title: image.name,
          price: image.price,
          imageUrl: image.src,
          userEmail: user.email,
          userName: user.name,
        });
  
        console.log("✅ POST 요청 응답:", response);
  
        setClickedIcons(prev => {
          console.log("🔄 클릭 상태 변경 전 상태:", prev);
          const updatedIcons = { ...prev, [image.id]: true };
          console.log("🔴 클릭 후 상태:", updatedIcons);
          return updatedIcons;
        });
  
        setWishlist(prev => {
          console.log("🔄 위시리스트 상태 확인 전:", prev);
          const newWishlist = [...prev, response.data];
          console.log("✅ 새 아이템 추가 후 상태:", newWishlist);
          return newWishlist;
        });
      }
    } catch (error) {
      console.error("❌ 에러 발생:", error.message);
    } finally {
      setIsLoading(false);
      console.log("🚀 로딩 상태를 false로 설정");
    }
  };
  
  
  
  
  
  
  
  

  return (
    <div className="product-gallery">
      {images.map(image => (
        <div
          key={image.id}
          className={`image-box ${removingItems.includes(image.id) ? 'removing' : ''}`}
        >
          <div className="recommendation-tag" onClick={() => handlePopupOpen(image.id)}>
            <div
              className="circle"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
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
              <span className="image-price">{image.price} 원</span>
            </div>
            <button className="tryon-button" onClick={() => handleTryOnClick(image)}>
              Try On
            </button>
          </div>
          <div
            className={`wishlist-icon ${clickedIcons[image.id] ? 'clicked' : ''}`}
            onClick={(e) => handleWishlistClick(e, image)}
          >
            <img
              src={clickedIcons[image.id] ? wishlistRed : whishlistBlack}
              alt="Wishlist Icon"
            />
          </div>
        </div>
      ))}

      {showPopup && (
        <RecommendationPopup
          onClose={() => setShowPopup(false)}
          recommendedProducts={recommendedProducts}
        />
      )}
    </div>
  );
};

export default Product;
