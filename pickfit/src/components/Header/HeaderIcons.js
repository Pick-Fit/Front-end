import React from "react";
import Wishlist from "../../images/wishlist.png";
import Lock from "../../images/lock.png";
import MyPage from "../../images/myPage.png";
import TryMeOn from "../../images/tryMeOn.png";

const HeaderIcons = ({ isLoggedIn, navigate, onLogoutClick }) => {



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
      </div>
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
