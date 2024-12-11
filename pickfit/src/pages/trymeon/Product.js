import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTryOn } from "../../contexts/TryOnContext";
import axios from "axios";
import "../../styles/trymeon/Product.css";
import wishlistRed from "../../images/wishlist_rad.png";
import whishlistBlack from "../../images/wishlist_black.png";
import checkWhiteIcon from "../../images/check_white.png";
import RecommendationPopup from "./RecommendationPopup";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";

const API_URL = process.env.REACT_APP_API_URL;
const API_Store_URL = process.env.REACT_Store_API_URL;

const Product = ({ images = [], removingItems = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIcons, setClickedIcons] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { setImageForTryOn } = useTryOn();
  const [isTriedOn, setIsTriedOn] = useState({});
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [user, setUser] = useState({ email: "", name: "" });
  const [wishlist, setWishlist] = useState([]);
  const { setSelectedItem } = useContext(SelectedItemContext);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    setUser({
      email: storedEmail || "",
      name: storedName || "",
    });
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/wishlist/${user.email}`
        );
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
    console.log("Setting image for Virtual Try On:", image);
  
    // id 값이 포함된 image 객체를 설정
    setSelectedItem({
      id: image.id,      // id 추가
      name: image.name,
      src: image.src,
      price: image.price,
    });
  
    // Update the isTriedOn state for the clicked image
    setIsTriedOn((prevState) => ({
      ...prevState,
      [image.id]: true,  // image.id로 tried on 상태 업데이트
    }));
  };
  

  const handlePopupOpen = (imageId) => {
    const randomRecommended = images
      .filter((image) => image.id !== imageId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRecommendedProducts(randomRecommended);
    setShowPopup(true);
  };

  const handleWishlistClick = async (e, image) => {
    e.stopPropagation();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const isCurrentlyRed = clickedIcons[image.id] || false;

      if (isCurrentlyRed) {
        await axios.delete(`${API_URL}/api/wishlist/${image.id}`, {
          params: { userEmail: user.email },
        });

        setClickedIcons((prev) => {
          const updatedIcons = { ...prev };
          delete updatedIcons[image.id];
          return updatedIcons;
        });

        setWishlist((prev) => {
          return prev.filter((item) => item.productId !== image.id);
        });
      } else {
        const response = await axios.post(`${API_URL}/api/wishlist`, {
          productId: image.id,
          title: image.name,
          price: image.price,
          imageUrl: image.src,
          userEmail: user.email,
          userName: user.name,
        });

        setClickedIcons((prev) => {
          return { ...prev, [image.id]: true };
        });

        setWishlist((prev) => {
          return [...prev, response.data];
        });
      }
    } catch (error) {
      console.error("Error handling wishlist action:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className={`image-box ${
            removingItems.includes(image.id) ? "removing" : ""
          }`}
        >
          <div
            className="recommendation-tag"
            onClick={() => handlePopupOpen(image.id)}
          >
            <div
              className="circle"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <span className="recommendation-text">
                {hoveredImage === image.id ? (
                  "click!"
                ) : (
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
              <span className="image-title" title={image.name}>
                {image.name}
              </span>
              <span className="image-price">{image.price} 원</span>
            </div>
            <div
              className="tryon-button"
              onClick={() => handleTryOnClick(image)}
            >
              {isTriedOn[image.id] ? (
                <img
                  src={checkWhiteIcon}
                  alt="Checked Icon"
                  className="check-icon"
                />
              ) : (
                "Try On"
              )}
            </div>
          </div>
          <div
            className={`wishlist-icon ${
              clickedIcons[image.id] ? "clicked" : ""
            }`}
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
