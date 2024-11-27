import React from "react";
import Close from "../images/close.png";

const TopBarPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 팝업이 열리지 않았으면 렌더링하지 않음

  const stopPropagation = (e) => {
    e.stopPropagation(); // 이벤트 전파 차단
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={stopPropagation}>
        <img
          src={Close}
          alt="Close"
          style={styles.closeIcon}
          onClick={onClose} // 닫기 버튼 클릭 시 부모 컴포넌트에서 전달된 onClose 호출
        />
        <nav style={styles.topBarNav}>
          <a href="#home" style={styles.topBarLink}>
            Home
          </a>
          <a href="#about" style={styles.topBarLink}>
            About
          </a>
          <a href="#services" style={styles.topBarLink}>
            Services
          </a>
          <a href="#contact" style={styles.topBarLink}>
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
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
    color: "black",
    position: "relative",
  },
};

const styles = {
  closeIcon: {
    width: "20px",
    height: "20px",
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
  topBarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  topBarLink: {
    textDecoration: "none",
    color: "#333",
    fontSize: "18px",
  },
};

export default TopBarPopup;
