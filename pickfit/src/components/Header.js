import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext 임포트
import mainHeaderLogo from '../images/main_header_logo.png';
import icon1 from '../images/wishlist.png';
import icon2 from '../images/lock.png';
import icon3 from '../images/myPage.png';
import icon4 from '../images/basket.png';

const Header = () => {
  const { isLoggedIn, userName, remainingTime, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
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
          {isLoggedIn && (
            <div style={styles.welcomeContainer}>
              <span style={styles.welcomeMessage}>{userName}님, 환영합니다!</span>
              <span style={styles.remainingTime}>남은 시간: {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</span>
            </div>
          )}
          <img src={icon1} alt="Wishlist"
          style={styles.icon}
          onClick={() => navigate("/wishlist")}
          />
          <img
            src={icon2}
            alt={isLoggedIn ? "Logout" : "Login"}
            style={styles.icon}
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          />
          <img
            src={icon3}
            alt="My Page"
            style={styles.icon}
            onClick={() => navigate("/mypage")}
          />
          <img src={icon4} alt="Basket"
          style={styles.icon}
          onClick={() => navigate("/basket")}
          />
        </div>
      </header>

    </>
  );
};



const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed', // 헤더 고정
    top: 0, // 화면 상단에 고정
    left: 0, // 화면 왼쪽 끝에 맞춤
    right: 0, // 화면 오른쪽 끝에 맞춤
    zIndex: 1000, // 다른 요소들 위에 표시되도록 설정
    backgroundColor: '#333', // 배경색 설정
    color: '#fff', // 텍스트 색상 설정
    boxShadow: '0 4px 2px -2px gray', // 헤더에 그림자 추가 (선택사항)
    padding: '8px 16px', // 여백 조정
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '10px',
  },
  logo: {
    width: '70px', // 로고 크기 조정
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
    marginRight: '20px'
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


export default Header;
