import React, { useState } from 'react';
import '../../styles/trymeon/TryMeOn.css';
import Product from '../trymeon/Product';
import Pagination from '../../components/Pagination';
import TabNavigation from '../../components/TabNavigation';

const TryMeOn = () => {
  const itemsPerPage = 8; // 한 페이지에 표시할 이미지 수
  const allImages = [
    { id: 1, src: '/images/product1.png', name: '상품 1', price: '$50' },
    { id: 2, src: '/images/product2.png', name: '상품 2', price: '$60' },
    { id: 3, src: '/images/product3.png', name: '상품 3', price: '$70' },
    { id: 4, src: '/images/product4.png', name: '상품 4', price: '$80' },
    { id: 5, src: '/images/product5.png', name: '상품 5', price: '$90' },
    { id: 6, src: '/images/product6.png', name: '상품 6', price: '$100' },
    { id: 7, src: '/images/product7.png', name: '상품 7', price: '$110' },
    { id: 8, src: '/images/product8.png', name: '상품 8', price: '$120' },
    { id: 9, src: '/images/product9.png', name: '상품 9', price: '$130' },
    { id: 10, src: '/images/product10.png', name: '상품 10', price: '$140' },
  ]; // 전체 이미지 데이터

  const [activeTab, setActiveTab] = useState('productCatalog'); // 활성화된 탭 상태
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 상태
  const totalPages = Math.ceil(allImages.length / itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 표시할 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleImages = allImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="try-me-on-container">
      {activeTab === 'virtualTryOn' && (
        <div className="sidebar-container">
          <h2>Virtual Try-On 콘텐츠</h2>
        </div>
      )}

      {activeTab === 'productCatalog' && (
        <div className="main-content">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Product 컴포넌트 하나로 전체 이미지 처리 */}
          <div className="product-container">
            <Product images={visibleImages} />
          </div>

          {/* 페이지네이션 */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TryMeOn;
