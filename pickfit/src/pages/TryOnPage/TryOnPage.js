import React from "react";
import "../../styles/TryOnPage/TryOnPage.css"; // CSS 분리
import Mannequin from "./Mannequin";
import UserTryOn from "./UserTryOn";
import Recommendation from "./Recommendation";

const TryOnPage = () => {
  return (
    <div className="tryon-page">
      {/* 상단 영역 */}
      <div className="tryon-top">
        {/* 왼쪽: 마네킹 영역 */}
        <Mannequin />

        {/* 오른쪽: 사용자 Try On 영역 */}
        <UserTryOn />
      </div>

      {/* 하단 영역 */}
      <Recommendation />
    </div>
  );
};

export default TryOnPage;
