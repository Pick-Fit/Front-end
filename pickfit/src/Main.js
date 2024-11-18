import React from "react";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("userName"); // URL 파라미터에서 userName 읽기

  return (
    <div>
      {/* 우측 상단에 환영 메시지 */}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        {userName ? `${userName}님, 환영합니다!` : "로그인 해주세요."}
      </div>
      {/* 메인 페이지 중앙 텍스트 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Main 페이지</h1>
      </div>
    </div>
  );
};

export default Main;
