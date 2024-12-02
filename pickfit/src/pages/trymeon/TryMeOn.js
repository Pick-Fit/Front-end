import React, { useState } from "react";
import "../../styles/trymeon/TryMeOn.css";
import Product from "../trymeon/Product";
import Pagination from "../../components/Pagination";
import TabNavigation from "../../components/TabNavigation";
import SlideSidebar from "../../components/SlideSidebar";

const TryMeOn = () => {
  const itemsPerPage = 8; // 한 페이지에 표시할 이미지 수
  const allImages = [
    { id: 1, src: "/images/product1.png", name: "상품 1", price: "$50", category: "패딩" },
    { id: 2, src: "/images/product2.png", name: "상품 2", price: "$60", category: "자켓" },
    { id: 3, src: "/images/product3.png", name: "상품 3", price: "$70", category: "코트" },
    { id: 4, src: "/images/product4.png", name: "상품 4", price: "$80", category: "니트웨어" },
    { id: 5, src: "/images/product5.png", name: "상품 5", price: "$90", category: "티셔츠/맨투맨" },
    { id: 6, src: "/images/product6.png", name: "상품 6", price: "$100", category: "셔츠" },
    { id: 7, src: "/images/product7.png", name: "상품 7", price: "$110", category: "아우터" },
    { id: 8, src: "/images/product8.png", name: "상품 8", price: "$120", category: "바지/데님" },
    { id: 9, src: "/images/product9.png", name: "상품 9", price: "$130", category: "블레이저/수트" },
    { id: 10, src: "/images/product10.png", name: "상품 10", price: "$140", category: "패딩" },
  ];

  const [activeTab, setActiveTab] = useState("productCatalog");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const itemsToShow = selectedCategory
    ? allImages.filter((item) => item.category === selectedCategory)
    : allImages;

  const handleTabChange = (tab) => setActiveTab(tab);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleCategorySelect = (category) => {
    console.log("선택된 카테고리:", category);
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리를 변경하면 첫 페이지로 이동
  };

  const totalPages = Math.ceil(itemsToShow.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleImages = itemsToShow.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="try-me-on-container">
      <SlideSidebar
        isOpen={activeTab === "productCatalog"}
        onClose={() => setActiveTab(null)}
        onCategorySelect={handleCategorySelect} // 선택된 카테고리 처리
      />

      {activeTab === "productCatalog" && (
        <div className="main-content">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="product-container">
            <Product images={visibleImages} />
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TryMeOn;
