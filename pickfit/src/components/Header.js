import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginModal from "../modal/LoginModal";
import LogoutModal from "../modal/LogoutModal";

import mainHeaderLogo from '../images/main_header_logo.png';
import icon1 from '../images/wishlist.png';
import icon2 from '../images/lock.png';
import icon3 from '../images/myPage.png';
import icon4 from '../images/basket.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [remainingTime, setRemainingTime] = useState(3600); // 초기 세션 시간 (1시간)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 로그아웃 모달 상태
  const [isLoginPromptModalOpen, setIsLoginPromptModalOpen] = useState(false); // 로그인 프롬프트 모달 상태
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/api/user"; // API URL 상수화

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL, { withCredentials: true });
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
  }, []);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    axios
      .post("http://localhost:8080/api/logout", {}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setIsLoggedIn(false);
        setUserName("");
        setRemainingTime(0);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Failed to logout:", error);
      })
      .finally(() => {
        setIsLogoutModalOpen(false);
      });
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      setIsLoginPromptModalOpen(true); // 로그인 프롬프트 모달 열기
    } else {
      navigate("/mypage"); // 로그인되어 있으면 마이페이지로 이동
    }
  };

  const handleLoginPromptConfirm = () => {
    setIsLoginPromptModalOpen(false); // 모달 닫기
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img
          src={mainHeaderLogo}
          alt="Header Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
      </div>

      <div style={styles.nav}>
        <a href="#contact" style={styles.contactLink}>Contact</a>
      </div>

      <div style={styles.iconContainer}>
        {isLoggedIn ? (
          <div style={styles.welcomeContainer}>
            <span style={styles.welcomeMessage}>{userName}님, 환영합니다!</span>
            <span style={styles.remainingTime}>남은 시간: {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</span>
          </div>
        ) : (
          <span style={styles.welcomeMessage}>로그인이 필요합니다.</span>
        )}
        <img src={icon1} alt="Wishlist" style={styles.icon} onClick={() => navigate("/wishlist")} />
        <img
          src={icon2}
          alt={isLoggedIn ? "Logout" : "Login"}
          style={styles.icon}
          onClick={isLoggedIn ? handleLogoutClick : () => navigate("/login")}
        />
        <img src={icon3} alt="My Page" style={styles.icon} onClick={handleMyPageClick} />
        <img src={icon4} alt="Basket" style={styles.icon} onClick={() => navigate("/basket")} />
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />

      <LoginModal
        isOpen={isLoginPromptModalOpen}
        onConfirm={handleLoginPromptConfirm}
      />
    </header>
  );
};


const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 4px 2px -2px gray',
    padding: '8px 16px',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '10px',
  },
  logo: {
    width: '70px',
    height: 'auto',
    cursor: 'pointer',
  },
  nav: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  contactLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    paddingRight: '10px',
    marginRight: '20px',
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: '10px',
  },
  welcomeMessage: {
    color: '#fff',
    fontSize: '14px',
  },
  remainingTime: {
    color: '#ffcc00',
    fontSize: '12px',
  },
  icon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    color: "black"
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default Header;
