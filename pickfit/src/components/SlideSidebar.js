import React, { useState } from "react";
import "../styles/SlideSidebar.css";
import CloseIcon from "../images/close.png";

const SlideSidebar = ({ isOpen, onClose, onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = {
    man: [
      "패딩",
      "자켓",
      "코트",
      "니트웨어",
      "티셔츠/맨투맨",
      "셔츠",
      "아우터",
      "바지/데님",
      "블레이저/수트",
    ],
    woman: [
      "패딩",
      "코트",
      "자켓",
      "니트웨어",
      "티셔츠/맨투맨",
      "블라우스/셔츠",
      "아우터",
      "블레이저/수트",
      "바지/데님",
      "원피스/점프수트",
      "스커트",
    ],
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleCategoryClick = (category) => {
    console.log("카테고리 클릭:", category); // 선택된 카테고리 확인
    if (onCategorySelect) {
      onCategorySelect(category); // 부모 컴포넌트로 전달
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-close-button" onClick={onClose}>
        <img src={CloseIcon} alt="Close Sidebar" className="close-icon" />
      </button>
      <div className="sidebar-content">
        <div className="category man-category">
          <div className="category-header" onClick={() => toggleCategory("man")}>
            Man
          </div>
          {activeCategory === "man" && (
            <ul className="subcategory-list">
              {categories.man.map((item) => (
                <li
                  key={item}
                  className="subcategory-item"
                  onClick={() => handleCategoryClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="category woman-category">
          <div className="category-header" onClick={() => toggleCategory("woman")}>
            Woman
          </div>
          {activeCategory === "woman" && (
            <ul className="subcategory-list">
              {categories.woman.map((item) => (
                <li
                  key={item}
                  className="subcategory-item"
                  onClick={() => handleCategoryClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideSidebar;
