import React, { useState } from "react";
import "../../styles/trymeon/TryMeOnSidebar.css";
import "../../styles/VirtualTryOn.css";
import VirtualTryOn from "../../pages/VirtualTryOn";
import RightArrow from "../../images/rightArrow.png";
import LeftArrow from "../../images/leftArrow.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <VirtualTryOn />
      </div>
      <div
        className={`sidebar-toggle-container ${
          isOpen ? "toggle-open" : "toggle-closed"
        }`}
        onClick={toggleSidebar}
      >
        <img
          src={isOpen ? LeftArrow : RightArrow}
          alt="Toggle Sidebar"
          className="arrow-icon"
        />
      </div>
    </div>
  );
};

export default Sidebar;
