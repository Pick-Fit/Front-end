import React from 'react';
import '../../styles/trymeon/RecommendationPopup.css';

const RecommendationPopup = ({ onClose, recommendedProducts = [], TryOnButton }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <h3>코디 추천 상품</h3>
        <div className="recommended-products">
          {recommendedProducts.map((product, index) => (
            <div key={product.id} className={`recommended-product row-${index < 2 ? 'top' : 'bottom'}`}>
              <img src={product.src} alt={product.name} className="recommended-product-image" />
              <div className="recommended-product-info">
                <div>
                  <span className="recommended-product-name">{product.name}</span>
                  <span className="recommended-product-price">${product.price}</span>
                </div>
                {/* Try On 버튼이 오른쪽에 위치 */}
                {TryOnButton && <TryOnButton image={product} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPopup;
