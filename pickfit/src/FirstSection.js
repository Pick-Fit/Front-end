// src/FirstSection.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './FirstSection.css';
import mainLogo from './images/main_logo.png';   // 로고 이미지 경로
import lockIcon from './images/lock-icon.svg';    // 자물쇠 아이콘 경로

const FirstSection = () => {
  const navigate = useNavigate();

  const handleLockClick = () => {
    navigate("/login");  // 로그인 페이지로 이동
  };

  return (
    <div className="first-section">
      <img src={mainLogo} alt="Main Logo" className="main-logo" />
      
      <div className="icons">
        {/* 자물쇠 아이콘 클릭 시 로그인 페이지로 이동 */}
        <img src={lockIcon} alt="Lock Icon" onClick={handleLockClick} className="lock-icon" />
      </div>
    </div>
  );
};

export default FirstSection;
