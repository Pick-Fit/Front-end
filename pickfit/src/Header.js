import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // AuthContext 임포트
import mainHeaderLogo from './images/main_header_logo.png';
import icon1 from './images/icon_1.png';
import icon2 from './images/icon_2.png';
import icon3 from './images/icon_3.png';
import icon4 from './images/icon_4.png';

const Header = () => {
  const { isLoggedIn, userName, remainingTime, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        {isLoggedIn && (
          <div style={styles.welcomeContainer}>
            <span style={styles.welcomeMessage}>{userName}님, 환영합니다!</span>
            <span style={styles.remainingTime}>남은 시간: {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</span>
          </div>
        )}
        <img src={icon1} alt="Icon 1" style={styles.icon} />
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
        <img src={icon4} alt="Icon 4" style={styles.icon} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
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
