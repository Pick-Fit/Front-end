import React, { useState } from 'react';
import '../../styles/trymeon/TryMeOn.css';
import Product from '../trymeon/Product';
import Pagination from '../../components/Pagination';
import CategoryFilter from './CategoryFilter';

// 'woman' 폴더와 'man' 폴더에서 JSON 파일을 각각 가져오기
const requireImagesWoman = require.context('../../woman', false, /category_processed_.*\.json$/);
const requireImagesMan = require.context('../../man', false, /category_processed_.*\.json$/);

// 두 폴더에서 가져온 JSON 데이터를 하나로 합침
const allJsonData = [
  ...requireImagesWoman.keys().map((key) => {
    const subcategory = key.split('_')[2]; // category_processed_ 다음에 나오는 부분을 하위 카테고리로 추출
    const data = requireImagesWoman(key); // 'woman' 폴더에서 데이터 가져오기
    return data.map((item) => ({
      ...item,
      category: '여자', // '여자' 카테고리 추가
      subcategory: subcategory, // 하위 카테고리 추가
    }));
  }),
  ...requireImagesMan.keys().map((key) => {
    const subcategory = key.split('_')[2]; // category_processed_ 다음에 나오는 부분을 하위 카테고리로 추출
    const data = requireImagesMan(key); // 'man' 폴더에서 데이터 가져오기
    return data.map((item) => ({
      ...item,
      category: '남자', // '남자' 카테고리 추가
      subcategory: subcategory, // 하위 카테고리 추가
    }));
  }),
].flat(); // 배열을 평탄화하여 하나의 배열로 만듭니다.

// JSON 데이터에서 이미지가 있는 항목만 필터링하여 추출
const jsonImages = allJsonData
  .flat()  // 각 JSON 파일의 데이터를 하나로 평탄화
  .filter((item) => item.product_info.images && item.product_info.images.length > 0) // 이미지가 있는 항목만 필터링
  .map((item) => ({
    id: item.product_info.id,
    src: item.product_info.images[0],  // 첫 번째 이미지 가져오기
    name: item.product_info.title,
    price: item.product_info.price,
    category: item.category, // '여자' 또는 '남자' 카테고리 값
    subcategory: item.subcategory, // 하위 카테고리
    detailUrl: item.product_info.detail_page_url,
  }));

const TryMeOn = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); // 카테고리 선택
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // 카테고리 선택 시 서브카테고리 초기화
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  // 카테고리와 서브카테고리 필터링
  const filteredImages = jsonImages.filter((item) => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const subcategoryMatch = selectedSubcategory ? item.subcategory === selectedSubcategory : true;
    return categoryMatch && subcategoryMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  // 서브카테고리 목록 추출 (카테고리 선택 후 해당 카테고리의 하위 카테고리 목록을 가져옴)
  const availableSubcategories = selectedCategory
    ? [...new Set(filteredImages.filter(item => item.category === selectedCategory).map(item => item.subcategory))]
    : [];

  return (
    <div className="try-me-on-container">
      <div className="main-content">
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          availableSubcategories={availableSubcategories} // 서브카테고리 목록 전달
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
