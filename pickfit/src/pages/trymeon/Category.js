import React, { useState } from 'react';
import '../../styles/trymeon/Category.css';
import manImage from '../../images/man.png';
import womanImage from '../../images/woman.png';

const Category = ({ onCategorySelect }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const categories = {
    남자: [
      "패딩",
      "자켓",
      "코트",
      "니트웨어",
      "티셔츠/맨투맨",
      "셔츠",
      "아우터",
      "바지/데님",
      "블레이저/수트",
      "스포츠/아웃도어"
    ],
    여자: [
      "드레스",
      "블라우스",
      "스커트",
      "니트웨어",
      "티셔츠",
      "자켓",
      "코트",
      "아우터",
      "스키니진",
      "스포츠웨어"
    ]
  };

  const toggleGender = (gender) => {
    if (selectedGender === gender) {
      setSelectedGender(null);
      setSubcategories([]);
    } else {
      setSelectedGender(gender);
      setSubcategories(categories[gender]);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    onCategorySelect({ gender: selectedGender, subcategory });
  };

  return (
    <div className="category-container">
      <div className="gender-category">
        <div
          onClick={() => toggleGender('남자')}
          className={`gender-item ${selectedGender === '남자' ? 'active' : ''}`}
        >
          <img src={manImage} alt="남자" />
          {selectedGender === '남자' && (
            <div className="subcategory-list">
              {subcategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleSubcategoryClick(category)}
                  className="subcategory-item"
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          onClick={() => toggleGender('여자')}
          className={`gender-item ${selectedGender === '여자' ? 'active' : ''}`}
        >
          <img src={womanImage} alt="여자" />
          {selectedGender === '여자' && (
            <div className="subcategory-list">
              {subcategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleSubcategoryClick(category)}
                  className="subcategory-item"
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
