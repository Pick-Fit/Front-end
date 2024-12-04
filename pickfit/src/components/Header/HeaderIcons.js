import React, { useState } from "react";
import Wishlist from "../../images/wishlist.png";
import Lock from "../../images/lock.png";
import MyPage from "../../images/myPage.png";
import TryMeOn from "../../images/tryMeOn.png";
import TopBar from "../../images/topBar.png";
import SlideSidebar from "../SlideSidebar"; // 슬라이드 사이드바 컴포넌트 추가

const HeaderIcons = ({ isLoggedIn, navigate, onLogoutClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <div style={styles.container}>
        <img
          src={Wishlist}
          alt="Wishlist"
          style={styles.icon}
          onClick={() => navigate("/wishlist")}
        />
        <img
          src={Lock}
          alt={isLoggedIn ? "Logout" : "Login"}
          style={styles.icon}
          onClick={isLoggedIn ? onLogoutClick : () => navigate("/login")}
        />
        <img
          src={MyPage}
          alt="MyPage"
          style={styles.icon}
          onClick={() => navigate("/myPage")}
        />
        <img
          src={TryMeOn}
          alt="TryMeOn"
          style={styles.icon}
          onClick={() => navigate("/tryMeOn")}
        />
        <img
          src={TopBar}
          alt="TopBar"
          style={styles.icon}
          onClick={toggleSidebar} // 슬라이드 사이드바 열기/닫기
        />
      </div>

      {/* 슬라이드 사이드바 */}
      <SlideSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    paddingRight: "10px",
    marginRight: "20px",
  },
  icon: {
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
};

export default HeaderIcons;
