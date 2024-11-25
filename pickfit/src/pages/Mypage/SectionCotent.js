import React, { useState } from 'react';
import "../../styles/MyPage.css";
import MaintenanceSection from "./MaintenanceSection";

const SectionContent = ({ activeSection, email, userName, setEmail, setUserName }) => {
  const [contactNumber, setContactNumber] = useState(''); // 연락처 상태 관리

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    console.log("변경된 이름:", newName); // 이름 변경 확인
  };

  const handleContactChange = (e) => {
    const newContact = e.target.value;
    setContactNumber(newContact);
    console.log("변경된 연락처:", newContact); // 연락처 변경 확인
  };

  if (activeSection === "info") {
    return (
      <div>
        <h3>이메일</h3>
        <div className="input-box">
          <input
            type="email"
            value={email}
            readOnly // 이메일 필드를 비활성화
            placeholder="이메일을 입력하세요"
            className="input-field input-disabled" // 추가 클래스명
          />
        </div>
        <h3>이름</h3>
        <div className="input-box">
          <input
            type="text"
            value={userName}
            onChange={handleNameChange} // 이름 변경 핸들러 연결변경
            placeholder="이름을 입력하세요"
            className="input-field"
            readOnly
          />
        </div>
        <h3>연락처</h3>
        <div className="input-box">
          <input
            type="tel"
            value={contactNumber}
            onChange={handleContactChange} // 이름 변경 핸들러 연결
            placeholder="연락처를 입력하세요"
            className="input-field"
          />
        </div>
        <div className="Storage">
          <div>저장</div>
        </div>
      </div>
    );
  }

  // 점검 중 섹션 메시지 설정
  const sectionMessages = {
    inquiries: "문의 사항에 대해 나중에 찾아와라",
    notices: "공지 사항을 확인하려면 나중에 찾아와라",
    support: "지원 관련 정보를 보려면 나중에 찾아와라",
  };

  // 점검 중 섹션 렌더링
  if (["inquiries", "notices", "support"].includes(activeSection)) {
    return <MaintenanceSection message={sectionMessages[activeSection]} />;
  }

  return null; // 기본 반환값
};

export default SectionContent;
