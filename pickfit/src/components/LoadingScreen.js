import React from "react";
import "../styles/LoadingScreen.css"; // 스타일 추가

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export default LoadingScreen;
