import React, { useState } from "react";
import { Box } from "lucide-react";
import leftArrow from "../../images/leftArrow.png";
import rightArrow from "../../images/rightArrow.png";
import closeIcon from "../../images/close.png";
import "../../styles/TryOnPage/VirtualFittingApp.css"; // CSS 파일을 임포트

const ClothingItemsSection = ({
  selectedItems,
  bigCategory, // bigCategory를 prop으로 받기
  goToPrevPage,
  goToNextPage,
  removeSelectedItem,
  currentPage,
  setSelectedItemForProduct,
  setSelectedItemForModel,
}) => {
  const itemsToShow = selectedItems.slice(currentPage * 2, currentPage * 2 + 2);

  const modelData = [
    {
      id: "model1",
      imageUrl: "https://i.ibb.co/TRhZzwh/processed-image.png",
    },
    {
      id: "model2",
      imageUrl: "http://localhost:8000/static/20241212181223_output.jpg",
    },
    {
      id: "model3",
      imageUrl: "https://file.mk.co.kr/meet/neds/2021/09/image_readtop_2021_925000_16328773574798448.jpg",
    },
    {
      id: "model4",
      imageUrl: "C:\Users\hi\OneDrive\바탕 화면\KakaoTalk_20241216_201323882.png",
    },
  ];

  const [modelPage, setModelPage] = useState(0);
  const modelsToShow = modelData.slice(modelPage * 2, modelPage * 2 + 2);

  const [activeSection, setActiveSection] = useState("items");

  const handleRegisterProduct = (id, src, bigCategory) => {
    setSelectedItemForProduct({ id, src, bigCategory });
  };

  const handleRegisterModel = (id, src) => {
    setSelectedItemForModel({ id, src });
  };

  const goToPrevModelPage = () => {
    setModelPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextModelPage = () => {
    setModelPage((prevPage) => {
      const maxPage = Math.ceil(modelData.length / 2) - 1;
      return Math.min(prevPage + 1, maxPage);
    });
  };

  return (
    <section className="clothing-items-section">

      <div className="section-selector">
        <div
          className={`section-btn ${activeSection === "items" ? "active" : ""}`}
          onClick={() => setActiveSection("items")}
        >
          상품
        </div>
        <div
          className={`section-btn ${activeSection === "models" ? "active" : ""}`}
          onClick={() => setActiveSection("models")}
        >
          모델
        </div>
      </div>

      {selectedItems.length === 0 && activeSection === "items" ? (
        <div className="empty-items">
          <Box size={50} color="gray" />
          <p>선택한 항목이 없습니다. 입어볼 항목을 추가해 주세요.</p>
        </div>
      ) : (
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
                    <p>{item.price} 원</p>
                  </div>
                  <div
                    className="register-btn"
                    onClick={() => handleRegisterProduct(item.id, item.src, item.bigCategory)}
                  >
                    등록
                  </div>
                </div>
              ))}
              <div className="arrow-button_right" onClick={goToNextPage}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </>
          ) : (
            <>
              <div className="arrow-button_left" onClick={goToPrevModelPage}>
                <img src={leftArrow} alt="Left Arrow" />
              </div>
              {modelsToShow.map((model) => (
                <div className="model-card" key={model.id}>
                  <img src={model.imageUrl} alt={model.name} />
                  <p>{model.name}</p>
                  <div
                    className="register-btn"
                    onClick={() => handleRegisterModel(model.id, model.imageUrl)}
                  >
                    등록
                  </div>
                </div>
              ))}
              <div className="arrow-button_right" onClick={goToNextModelPage}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ClothingItemsSection;
