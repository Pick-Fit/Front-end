import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../Mypage/ProfileSection";
import Sidebar from "../Mypage/Sidebar";
import SectionContent from "../Mypage/SectionCotent";
import VirtualTryOn from "../VirtualTryOn";
import "../../styles/MyPage.css";
import axios from "axios";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeSection, setActiveSection] = useState("info");
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/user"; // API URL 상수화

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (!isLoggedIn) {
    return null; // 리다이렉션이 발생하기 전에 렌더링 방지
  }

  return (
    <div className="my-page-container">
      <div className="mypage-container">
        <div className="mypage-border-content">
          <div className="my-page-content">
            <div className="pickfit-text">PickFit</div>
            <ProfileSection userName={userName} email={email} />
          </div>

          <div className="border-box-container">
            <div className="border-box1">
              <Sidebar
                activeSection={activeSection}
                handleSectionClick={handleSectionClick}
              />
            </div>
            <div className="border-box2">
              <SectionContent
                activeSection={activeSection}
                email={email}
                userName={userName}
                setEmail={setEmail}
                setUserName={setUserName}
              />
            </div>
          </div>
        </div>
      </div>
      <VirtualTryOn />
    </div>
  );
};

export default MyPage;
