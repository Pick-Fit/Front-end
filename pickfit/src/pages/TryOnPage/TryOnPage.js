import React, { useState, useContext } from "react";
import { Camera, Upload, Maximize2 } from "lucide-react";
import "../../styles/TryOnPage/VirtualFittingApp.css";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";

const VirtualFittingApp = () => {
  const [virtualTryOn, setVirtualTryOn] = useState(false);
  const { selectedItem } = useContext(SelectedItemContext);

  return (
    <div className="virtual-fitting-app">
      <main>
        <section className="virtual-tryon-section">
          {virtualTryOn ? (
            <div className="virtual-tryon-content">Virtual Try-On Content</div>
          ) : (
            <div className="virtual-tryon-placeholder">
              <Camera size={64} />
              <h2>Start Your Virtual Fitting</h2>
              <div className="button-group">
                <div
                  className="take-photo-btn"
                  onClick={() => setVirtualTryOn(true)}
                >
                  <Camera /> Take Photo
                </div>
                <div className="upload-image-btn">
                  <Upload /> Upload Image
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="clothing-items-section">
          <h2>Available Items</h2>
          <div className="items-grid">
            <div
              className="item-card"
              onClick={() => console.log(`Selected: `)}
            >
              {/* 아이템 이미지 */}
              <img src={selectedItem?.src} alt={selectedItem?.name} />

              {/* 이름과 가격 */}
              {selectedItem ? (
                <div className="item-name-price">
                  <h2>{selectedItem.name}</h2>
                  <p>{selectedItem.price} 원</p>
                </div>
              ) : null}

              {/* 아이템 디테일 및 버튼 */}
              <div className="item-details"></div>
              <div
                className="tryon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Virtual Try-On
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2024 Virtual Fitting Room. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default VirtualFittingApp;