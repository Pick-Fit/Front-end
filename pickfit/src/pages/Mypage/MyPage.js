import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ProfileSection from "../Mypage/ProfileSection";
import Sidebar from "../Mypage/Sidebar";
import SectionContent from "../Mypage/SectionCotent";
import VirtualTryOn from "../VirtualTryOn";
import "../../styles/MyPage.css";
import axios from "axios";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("info");
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/user"; // API URL 상수화


  useEffect(() => {
    // 사용자 정보를 가져오는 API 호출
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL, { withCredentials: true });
        const { email, name } = response.data; // API에서 이메일과 이름 가져오기
        setEmail(email);
        setUserName(name);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error.response || error.message);
        setIsLoggedIn(false); // 로그인되지 않은 상태 처리
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="my-page-container">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLockClick={handleLogout}
      />
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
      <VirtualTryOn/>
    </div>

  );
};

export default MyPage;
