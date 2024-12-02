import React from 'react';
import '../styles/TabNavigation.css'; // 네비게이션 탭 스타일

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button
        className={`tab-button ${activeTab === 'virtualTryOn' ? 'active' : ''}`}
        onClick={() => onTabChange('virtualTryOn')}
      >
        Virtual Try-On
      </button>
      <button
        className={`tab-button ${activeTab === 'productCatalog' ? 'active' : ''}`}
        onClick={() => onTabChange('productCatalog')}
      >
        Product Catalog
      </button>
    </div>
  );
};

export default TabNavigation;
