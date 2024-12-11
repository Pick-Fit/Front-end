import React, { useState } from "react";
import { Box } from "lucide-react";
import leftArrow from "../../images/leftArrow.png";
import rightArrow from "../../images/rightArrow.png";
import closeIcon from "../../images/close.png";
import "../../styles/TryOnPage/VirtualFittingApp.css"; // CSS 파일을 임포트

const ClothingItemsSection = ({
  selectedItems,
  goToPrevPage,
  goToNextPage,
  removeSelectedItem,
  currentPage,
}) => {
  const itemsToShow = selectedItems.slice(currentPage * 2, currentPage * 2 + 2);

  // 모델 및 상품 섹션을 관리하는 state
  const [activeSection, setActiveSection] = useState("items"); // 'items' or 'models'

  return (
    <section className="clothing-items-section">
      <h2>사용 가능한 항목</h2>

      {/* 상품과 모델 세션 선택 */}
      <div className="section-selector">
        <div
          className={`section-btn ${activeSection === "items" ? "active" : ""}`}
          onClick={() => setActiveSection("items")}
        >
          상품
        </div>
        <div
          className={`section-btn ${
            activeSection === "models" ? "active" : ""
          }`}
          onClick={() => setActiveSection("models")}
        >
          모델
        </div>
      </div>

      {selectedItems.length === 0 ? (
        <div className="empty-items">
          <Box size={50} color="gray" />
          <p>선택한 항목이 없습니다. 입어볼 항목을 추가해 주세요.</p>
        </div>
      ) : (
        // 상품 선택 섹션
        <div className="items-grid">
          {activeSection === "items" ? (
            <>
              <div className="arrow-button_left" onClick={goToPrevPage}>
                <img src={leftArrow} alt="Left Arrow" />
              </div>
              {itemsToShow.map((item) => (
                <div key={item.id} className="item-card">
                  <div
                    className="close-icon"
                    onClick={() => removeSelectedItem(item.id)}
                  >
                    <img src={closeIcon} alt="Close Icon" />
                  </div>
                  <div className="img-box">
                    <img src={item.src} alt={item.name} />
                  </div>
                  <div className="item-name-price">
                    <h2>{item.name}</h2>
                    <p>{item.price} 원</p>
                  </div>
                </div>
              ))}
              <div className="arrow-button_right" onClick={goToNextPage}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </>
          ) : (
            // 모델 선택 섹션
            <div className="models-grid">
              <>
              <div className="arrow-button_left" onClick={goToPrevPage}>
                <img src={leftArrow} alt="Left Arrow" />
              </div>
              <div className="model-card">
                <img
                  src="https://via.placeholder.com/300x400?text=Model+1"
                  alt="Model 1"
                />
                <p>모델 1</p>
              </div>

              <div className="model-card">
                <img
                  src="https://via.placeholder.com/300x400?text=Model+1"
                  alt="Model 1"
                />
                <p>모델 2</p>
              </div>
              <div className="arrow-button_right" onClick={goToNextPage}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
              </>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ClothingItemsSection;
