import React, { useState, useEffect } from "react";
import "../styles/SlideSidebar.css";
import CloseIcon from "../images/close.png"; // 닫기 아이콘 이미지 임포트

const SlideSidebar = ({   
    isOpen = false, 
    onClose = () => {}, 
    onCategorySelect = () => {}  }) => {
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

  const handleSubcategoryClick = (subcategory) => {
    if (typeof onCategorySelect === 'function') {
      onCategorySelect(subcategory); // 하위 카테고리 선택 시 필터링
      onClose(); // 사이드바 닫기
    } else {
      console.error('onCategorySelect prop is not a function:', onCategorySelect);
    }
  };

  // 사이드바가 열릴 때마다 `onCategorySelect`가 제대로 전달되고 있는지 확인
  useEffect(() => {
    if (isOpen) {
      setActiveCategory(null); // 사이드바 열릴 때마다 선택된 카테고리 초기화
    }
  }, [isOpen]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-close-button" onClick={onClose}>
        <img src={CloseIcon} alt="Close Sidebar" className="close-icon" />
      </button>
      <div className="sidebar-content">
        {Object.keys(categories).map((key) => (
          <div key={key} className={`category ${key}-category`}>
            <div className="category-header" onClick={() => toggleCategory(key)}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            {activeCategory === key && (
              <ul className="subcategory-list">
                {categories[key].map((item, index) => (
                  <li
                    key={index}
                    className="subcategory-item"
                    onClick={() => handleSubcategoryClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideSidebar;
