import React, { useState, useEffect } from "react";
import axios from "axios";

const VirtualTryOnSection = ({
  selectedItemForProduct,
  selectedItemForModel,
}) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [email, setEmail] = useState(""); // State to hold the email

  // Retrieve email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const toggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleRegisterClick = async () => {
    // Log email for debugging
    console.log("User Email:", email || "No email provided");

    // Extract the required data for requestData
    const requestData = {
      email: email || "No email provided",
      modelSrc: selectedItemForModel ? selectedItemForModel.src : null,
      bigCategory: selectedItemForProduct ? selectedItemForProduct.bigCategory : null,
      productSrc: selectedItemForProduct ? selectedItemForProduct.src : null,
      productId: selectedItemForProduct ? selectedItemForProduct.id : null,
    };

    // Log the request data to be sent
    console.log("Request Data:", requestData);

    // Send the request to the backend
    try {
      const response = await axios.post("http://localhost:8080/trymeon/process", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Data sent successfully!");
        console.log("Response from backend:", response.data);
      } else {
        console.log("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during axios request:", error);
    }
  };

  return (
    <div className="virtual-tryon-div">
      <button onClick={toggleBox} className="toggle-button">
        {isBoxVisible ? "Hide Box" : "Show Box"}
      </button>
      <div className={`slide-box ${isBoxVisible ? "visible" : "hidden"}`}>
        {selectedItemForProduct && (
          <div className="selected-item">
            <img
              src={selectedItemForProduct.src}
              alt={`Selected ${selectedItemForProduct.id}`}
            />
          </div>
        )}
        {selectedItemForModel && (
          <div className="selected-item">
            <img
              src={selectedItemForModel.src}
              alt={`Selected ${selectedItemForModel.id}`}
            />
          </div>
        )}
        {!selectedItemForProduct && !selectedItemForModel && (
          <p>No item or model selected</p>
        )}
      </div>
      <button onClick={handleRegisterClick} className="register-button">
        Register
      </button>
    </div>
  );
};

export default VirtualTryOnSection;
