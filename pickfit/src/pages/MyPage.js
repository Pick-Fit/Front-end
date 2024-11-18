import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/MyPage.css";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <div className="my-page-container">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLockClick={handleLogout}
      />
      <div className="my-page-content">
        <div className="pickfit-text">PickFit</div>
        <div className="profile-container">
          <div className="profile-image-box">
            <img src="https://via.placeholder.com/100" alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <p className="profile-name">{userName || "홍길동"}</p>
            <p className="profile-email">{email || "test@naver.com"}</p>
          </div>
        </div>
      </div>

      <div className="border-box-container">
        <div className="border-box1">
          <h3>내 정보 관리</h3>

          <hr className="border-line" />
          <h3>문의사항</h3>

          <hr className="border-line" />
          <h3>공지사항</h3>

          <hr className="border-line" />
          <h3>고객센터</h3>

        </div>
      </div>

      <div className="border-box2">
        <h3>이메일</h3>
        <div className="input-box">
          <input type="email" placeholder="이메일을 입력하세요" className="input-field" />
        </div>

        <h3>이름</h3>
        <div className="input-box">
          <input type="text" placeholder="이름을 입력하세요" className="input-field" />
        </div>
        
        <h3>연락처</h3>
        <div className="input-box">
          <input type="tel" placeholder="연락처를 입력하세요" className="input-field" />
        </div>
      </div>

    </div>
  );
};

export default MyPage;
