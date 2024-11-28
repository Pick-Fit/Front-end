import React, { useState } from 'react';
import '../../styles/trymeon/TryMeOn.css';
import '../../styles/VirtualTryOn.css'; // VirtualTryOn.css 포함
import VirtuakTryOn from '../VirtualTryOn';
import Category from '../trymeon/Category'; // 상품 카테고리 컴포넌트
import Product from '../trymeon/Product'; // 상품 등록 컴포넌트

const TryMeOn = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const handleCategorySelect = (categoryData) => {
      // 하위 카테고리 선택 정보를 저장
      setSelectedCategory(categoryData);
    };
  
    return (
      <div className="try-me-on-container">
        <div className="sidebar-container">
          <VirtuakTryOn />
        </div>
        <div className="category-container">
          <Category onCategorySelect={handleCategorySelect} />
        </div>
        <div className="product-container">
          <Product category={selectedCategory} />
        </div>
      </div>
    );
  };
  

export default TryMeOn;
