import React from 'react';
import '../../styles/trymeon/Product.css'; // 상품 등록 스타일 포함

const Product = ({ images }) => {
  return (
    <div className="product-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-box">
          <img src={image.src} alt={image.name} className="product-image" />
          <div className="image-footer">
            <div className="image-info">
              <span className="image-title">{image.name}</span>
              <span className="image-price">{image.price}</span>
            </div>
            <button className="tryon-button">Try On</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
