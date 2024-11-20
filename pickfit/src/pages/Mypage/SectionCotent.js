// SectionContent.js
import "../../styles/MyPage.css";
import MaintenanceSection from "./MaintenanceSection";

const SectionContent = ({ activeSection, email, userName, setEmail, setUserName }) => {
  if (activeSection === "info") {
    return (
      <div>
        <h3>이메일</h3>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 상태 변경
            placeholder="이메일을 입력하세요"
            className="input-field"
          />
        </div>
        <h3>이름</h3>
        <div className="input-box">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // 이름 입력값 상태 변경
            placeholder="이름을 입력하세요"
            className="input-field"
          />
        </div>
        <h3>연락처</h3>
        <div className="input-box">
          <input
            type="tel"
            placeholder="연락처를 입력하세요"
            className="input-field"
          />
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
