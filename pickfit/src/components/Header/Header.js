import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginModal from "../../modal/LoginModal";
import LogoutModal from "../../modal/LogoutModal";
import HeaderLogo from "./HeaderLogo";
import HeaderIcons from "./HeaderIcons";
import HeaderWelcome from "./HeaderWelcome";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [remainingTime, setRemainingTime] = useState(3600); // 초기 세션 시간 (1시간)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginPromptModalOpen, setIsLoginPromptModalOpen] = useState(false);
  const navigate = useNavigate();

  // 환경 변수로 API URL을 가져옵니다.
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user`, { withCredentials: true });
        const { name } = response.data;
        setUserName(name);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error.response || error.message);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [API_URL]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    axios
      .post(`${API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setUserName("");
        setRemainingTime(0);
        navigate("/login");
      })
      .catch((error) => console.error("Failed to logout:", error))
      .finally(() => setIsLogoutModalOpen(false));
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLoginPromptConfirm = () => {
    setIsLoginPromptModalOpen(false);
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <HeaderLogo navigate={navigate} />
      <HeaderWelcome
        isLoggedIn={isLoggedIn}
        userName={userName}
        remainingTime={remainingTime}
      />
      <HeaderIcons
        isLoggedIn={isLoggedIn}
        navigate={navigate}
        onLogoutClick={handleLogoutClick}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
      <LoginModal isOpen={isLoginPromptModalOpen} onConfirm={handleLoginPromptConfirm} />
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#333",
    color: "#fff",
    boxShadow: "0 4px 2px -2px gray",
    padding: "8px 16px",
  },
};

export default Header;
