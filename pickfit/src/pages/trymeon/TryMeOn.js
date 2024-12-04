import React, { useState } from 'react';
import '../../styles/trymeon/TryMeOn.css';
import Product from '../trymeon/Product';
import Pagination from '../../components/Pagination';
import CategoryFilter from './CategoryFilter';

const TryMeOn = () => {
  const itemsPerPage = 10;
  const allImages = [
    { id: 1, src: '/images/product1.png', name: '상품 1', price: '$50', category: '남자', subcategory: '패딩' },
    { id: 2, src: '/images/product2.png', name: '상품 2', price: '$60', category: '여자', subcategory: '코트' },
    { id: 3, src: '/images/product3.png', name: '상품 3', price: '$70', category: '남자', subcategory: '자켓' },
    { id: 4, src: '/images/product4.png', name: '상품 4', price: '$80', category: '여자', subcategory: '니트웨어' },
    { id: 5, src: '/images/product5.png', name: '상품 5', price: '$90', category: '남자', subcategory: '셔츠' },
    { id: 6, src: '/images/product6.png', name: '상품 6', price: '$100', category: '여자', subcategory: '바지/데님' },
    { id: 7, src: '/images/product7.png', name: '상품 7', price: '$110', category: '남자', subcategory: '바지/데님' },
    { id: 8, src: '/images/product8.png', name: '상품 8', price: '$120', category: '여자', subcategory: '티셔츠/맨투맨' },
    { id: 9, src: '/images/product9.png', name: '상품 9', price: '$130', category: '남자', subcategory: '코트' },
    { id: 10, src: '/images/product10.png', name: '상품 10', price: '$140', category: '여자', subcategory: '스커트' },
    { id: 11, src: '/images/product11.png', name: '상품 11', price: '$150', category: '여자', subcategory: '원피스' },
    { id: 12, src: '/images/product12.png', name: '상품 12', price: '$160', category: '남자', subcategory: '스웨터' },
    { id: 13, src: '/images/product13.png', name: '상품 13', price: '$170', category: '여자', subcategory: '셔츠' },
    { id: 14, src: '/images/product14.png', name: '상품 14', price: '$180', category: '남자', subcategory: '니트웨어' },
    { id: 15, src: '/images/product15.png', name: '상품 15', price: '$190', category: '여자', subcategory: '자켓' },
  ];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const filteredImages = selectedSubcategory
    ? allImages.filter((item) => item.subcategory === selectedSubcategory)
    : selectedCategory 
      ? allImages.filter((item) => item.category === selectedCategory)
      : allImages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="try-me-on-container">
      <div className="main-content">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onResetFilters={handleResetFilters}
          onSubcategorySelect={handleSubcategorySelect}
        />
        
        <div className="product-container">
          <Product images={visibleImages} />
        </div>

        <Pagination
          totalPages={Math.ceil(filteredImages.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};


export default TryMeOn;
