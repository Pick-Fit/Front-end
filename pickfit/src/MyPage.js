// src/MyPage.js
import React, { useEffect, useState } from "react";
import Header from "./Header";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");

    if (storedEmail && storedUserName) {
      setEmail(storedEmail);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div>
      <Header
        isLoggedIn={true}
        userName={userName}
        remainingTime="유지 중" // MyPage에서 시간 계산 생략
        handleLockClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      />
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '60px' }}>
        <h1>마이페이지</h1>
        <p><strong>이메일:</strong> {email}</p>
        <p><strong>이름:</strong> {userName}</p>
      </div>
    </div>
  );
};

export default MyPage;
