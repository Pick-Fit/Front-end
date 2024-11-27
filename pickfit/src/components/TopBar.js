import React, { useState } from "react";
import "../styles/TopBar.css"; // CSS 파일 import
import Close from "../images/close.png";

const TopBarPopup = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(""); // 남자/여자 카테고리 상태
  const categories = [
    "패딩",
    "자켓",
    "코트",
    "니트웨어",
    "티셔츠/맨투맨",
    "셔츠",
    "아우터",
    "바지/데님",
    "블레이저/수트",
    "스포츠/아웃도어",
  ];

  if (!isOpen) return null; // 팝업이 열리지 않았으면 렌더링하지 않음

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? "" : category)); // 카테고리 열기/닫기
  };

  return (
    <div className="top-bar">
      <div className="topbar-container">
        <img
          src={Close}
          alt="Close"
          className="close-icon"
          onClick={onClose} // close 아이콘 클릭 시 부모 컴포넌트에서 전달된 onClose 호출
        />
        <div className="category-container">
          <div
            className={`category-button ${
              activeCategory === "남자" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("남자")}
          >
            남자
          </div>
          <div
            className={`category-button ${
              activeCategory === "여자" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("여자")}
          >
            여자
          </div>
        </div>
        <div
          className={`subcategory-container ${
            activeCategory ? "open" : "closed"
          }`}
        >
          {categories.map((item, index) => (
            <div key={index} className="subcategory-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBarPopup;
