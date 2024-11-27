import React from "react";
import TryMeOnSidebar from "../trymeon/TryMeOnSidebar";
// import ProductList from "../trymeon/ProductList";
import "../../styles/trymeon/TryMeOn.css";

const TryMeOn = () => {
  return (
    <div className="try-me-on-container">
      <TryMeOnSidebar />
      <div className="product-container">
        {/* <ProductList /> */}
      </div>
    </div>
  );
};

export default TryMeOn;
