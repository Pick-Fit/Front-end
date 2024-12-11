import React, { useState, useContext, useEffect } from "react";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";
import VirtualTryOnSection from "./VirtualTryOnSection ";
import ClothingItemsSection from "./ClothingItemsSection";

const VirtualFittingApp = () => {
  const [virtualTryOn, setVirtualTryOn] = useState(false);
  const { selectedItems, removeItems } = useContext(SelectedItemContext);
  const [currentPage, setCurrentPage] = useState(0);

  // selectedItems 변경 시 콘솔 로그 추가
  useEffect(() => {
    console.log("Selected Items Updated: ", selectedItems);
  }, [selectedItems]);

  const goToNextPage = () => {
    if ((currentPage + 1) * 2 < selectedItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const removeSelectedItem = (itemId) => {
    console.log("Removing item with ID:", itemId);
    removeItems({ id: itemId });
  };

  return (
    <div className="virtual-fitting-app">
      <main>
        <VirtualTryOnSection virtualTryOn={virtualTryOn} setVirtualTryOn={setVirtualTryOn} />
        <ClothingItemsSection
          selectedItems={selectedItems}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          removeSelectedItem={removeSelectedItem}
          currentPage={currentPage}
        />
      </main>

      <footer>
        <p>© 2024 Pickfit. 매일의 스타일을 완성하는 곳, 당신의 취향을 반영한 패션을 제안합니다. 세상에 하나뿐인 나만의 스타일을 경험하세요.</p>
      </footer>
    </div>
  );
};

export default VirtualFittingApp;
