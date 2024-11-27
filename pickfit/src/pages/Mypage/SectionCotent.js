import React, { useState, useEffect } from 'react';
import "../../styles/MyPage.css";
import MaintenanceSection from "./MaintenanceSection";

const SectionContent = ({ activeSection, email, userName, phoneNum: initialPhoneNum }) => {
  const [phoneNum, setPhoneNum] = useState(""); // DB의 최신 연락처
  const [contactNumber, setContactNumber] = useState(""); // 포맷팅된 연락처 관리
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 활성화 상태
  const API_URL = "http://localhost:8080/api/update";

  // 최초 로딩 시 DB의 `phoneNum`을 포맷팅하여 `contactNumber`로 설정
  useEffect(() => {
    if (initialPhoneNum) {
      setPhoneNum(initialPhoneNum); // DB에서 가져온 원본 연락처
      setContactNumber(formatPhoneNumber(initialPhoneNum)); // 포맷팅된 연락처 설정
    }
  }, [initialPhoneNum]);

  useEffect(() => {
    // 저장 버튼 활성화 조건 확인
    const cleanNumber = contactNumber.replace(/-/g, ""); // '-' 제거한 숫자만
    if (cleanNumber.length === 11) {
      if (cleanNumber === phoneNum.replace(/-/g, "")) {
        setErrorMessage("동일한 연락처가 입력되었습니다.");
        setIsButtonDisabled(true); // 버튼 비활성화
      } else {
        setErrorMessage(""); // 에러 메시지 초기화
        setIsButtonDisabled(false); // 버튼 활성화
      }
    } else {
      setIsButtonDisabled(true); // 11자리 미만이면 비활성화
      if (cleanNumber.length > 11) {
        setErrorMessage("전화번호는 최대 11자리까지 입력 가능합니다.");
      } else {
        setErrorMessage("");
      }
    }
  }, [contactNumber, phoneNum]);

  const handleContactChange = (e) => {
    const input = e.target.value.replace(/-/g, ""); // '-' 제거

    // 숫자가 아닌 문자 확인
    if (!/^\d*$/.test(input)) {
      setErrorMessage("숫자만 입력 가능합니다.");
      return;
    }

    // 최대 11자리까지만 허용
    if (input.length > 11) {
      setErrorMessage("전화번호는 최대 11자리까지 입력 가능합니다.");
      return;
    }

    // 에러 메시지 초기화
    setErrorMessage("");

    // 전화번호 포맷팅
    const formattedNumber = formatPhoneNumber(input);
    setContactNumber(formattedNumber);
  };

  const formatPhoneNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, ""); // 숫자 외 제거
    const match = cleanNumber.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);

    if (!match) return cleanNumber;

    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  };

  const handleSave = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phoneNum: contactNumber.replace(/-/g, ""), // '-' 제거한 상태로 저장
        }),
      });

      if (response.ok) {
        console.log('연락처 저장 성공');
        alert('연락처가 성공적으로 저장되었습니다!');
        setPhoneNum(contactNumber.replace(/-/g, "")); // DB 연락처 최신화
      } else {
        console.error('연락처 저장 실패:', await response.text());
        alert('연락처 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('연락처 저장 중 에러:', error);
      alert('연락처 저장 중 에러가 발생했습니다.');
    }
  };

  if (activeSection === "info") {
    return (
      <div>
        <h3>이메일</h3>
        <div className="input-box">
          <input
            type="email"
            value={email}
            readOnly
            placeholder="이메일을 입력하세요"
            className="input-field input-disabled"
          />
        </div>
        <h3>이름</h3>
        <div className="input-box">
          <input
            type="text"
            value={userName}
            placeholder="이름을 입력하세요"
            className="input-field input-disabled"
            readOnly
          />
        </div>
        <h3>연락처</h3>
        <div className="input-box">
          <input
            type="tel"
            value={contactNumber} // 포맷팅된 연락처 상태
            onChange={handleContactChange}
            placeholder="연락처를 입력하세요"
            className="input-field"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="Storage">
          <button onClick={handleSave} disabled={isButtonDisabled}>
            저장
          </button>
        </div>
      </div>
    );
  }

  const sectionMessages = {
    inquiries: "문의 사항에 대해 나중에 찾아와라",
    notices: "공지 사항을 확인하려면 나중에 찾아와라",
    support: "지원 관련 정보를 보려면 나중에 찾아와라",
  };

  if (["inquiries", "notices", "support"].includes(activeSection)) {
    return <MaintenanceSection message={sectionMessages[activeSection]} />;
  }

  return null;
};

export default SectionContent;
