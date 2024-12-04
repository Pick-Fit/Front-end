import React from 'react';
import '../../styles/trymeon/CategoryFilter.css';

const subcategories = {
  남자: ['패딩', '자켓', '코트', '니트웨어', '티셔츠/맨투맨', '셔츠', '아우터', '바지/데님', '블레이저/수트'],
  여자: ['패딩', '코트', '자켓', '니트웨어', '티셔츠/맨투맨', '블라우스/셔츠', '아우터', '블레이저/수트', '바지/데님', '원피스/점프수트'],
};

const CategoryFilter = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onCategorySelect, 
  onResetFilters, 
  onSubcategorySelect 
}) => {
  return (
    <div className="category-filter-section">
      <div className="main-categories">
        <button 
          className={!selectedCategory ? 'active' : ''} 
          onClick={onResetFilters}
        >
          ALL
        </button>
        <button 
          className={selectedCategory === '남자' ? 'active' : ''} 
          onClick={() => onCategorySelect('남자')}
        >
          Man
        </button>
        <button 
          className={selectedCategory === '여자' ? 'active' : ''} 
          onClick={() => onCategorySelect('여자')}
        >
          Woman
        </button>
      </div>
      {selectedCategory && (
        <div className="subcategories">
          {subcategories[selectedCategory].map((subcategory) => (
            <button 
              key={subcategory} 
              className={selectedSubcategory === subcategory ? 'active' : ''}
              onClick={() => onSubcategorySelect(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;