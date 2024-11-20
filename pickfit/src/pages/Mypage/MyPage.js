import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ProfileSection from "../Mypage/ProfileSection";
import Sidebar from "../Mypage/Sidebar";
import SectionContent from "../Mypage/SectionCotent";
import "../../styles/MyPage.css";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("info"); // 활성화된 항목 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");

    if (storedEmail && storedUserName) {
      setEmail(storedEmail);
      setUserName(storedUserName);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setActiveSection(section); // 클릭한 항목을 활성화
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
      <div className="border-box3">
        <div>Virtual Try On</div>
      </div>
    </div>

  );
};

export default MyPage;
