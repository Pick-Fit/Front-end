import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경
import Header from "../components/Header";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [remainingTime, setRemainingTime] = useState("유지 중"); // 상태로 시간 관리

  const navigate = useNavigate(); // useNavigate로 페이지 이동을 처리

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");

    if (storedEmail && storedUserName) {
      setEmail(storedEmail);
      setUserName(storedUserName);
      setIsLoggedIn(true); // 이메일과 이름이 있을 경우 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 로컬스토리지에 값이 없으면 로그인되지 않음
    }
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // navigate를 사용하여 페이지 이동
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn} // 동적으로 로그인 상태 전달
        userName={userName}
        remainingTime={remainingTime} // 동적으로 처리된 시간 전달
        handleLockClick={handleLogout} // 로그아웃 함수 전달
      />
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '60px' }}>
        <h1>마이페이지</h1>
        <p><strong>이메일:</strong> {email || "로그인된 이메일 없음"}</p> {/* 기본값 처리 */}
        <p><strong>이름:</strong> {userName || "로그인된 이름 없음"}</p> {/* 기본값 처리 */}
      </div>
    </div>
  );
};

export default MyPage;
