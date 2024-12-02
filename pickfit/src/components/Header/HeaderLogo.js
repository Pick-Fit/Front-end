import React from "react";
import mainHeaderLogo from "../../images/main_header_logo.png";

const HeaderLogo = ({ navigate }) => {
  return (
    <div style={styles.logoContainer}>
      <img
        src={mainHeaderLogo}
        alt="Header Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

const styles = {
  logoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "5px",
  },
  logo: {
    width: "70px",
    height: "auto",
    cursor: "pointer",
  },
};

export default HeaderLogo;
