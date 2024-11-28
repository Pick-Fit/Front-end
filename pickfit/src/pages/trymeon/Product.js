import React from 'react';
import '../../styles/trymeon/Product.css'; // 상품 등록 스타일 포함

const Product = ({ category }) => {
  if (!category) {
    return <p>상품을 선택해주세요.</p>;
  }

  return (
    <>
      <h3>{category.gender} - {category.subcategory} 상품</h3>
      <p>{category.gender}의 {category.subcategory} 관련 상품을 표시합니다.</p>
    </>
  );
};

export default Product;
