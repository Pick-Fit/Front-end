import React, { useState } from "react";
import image1 from "../../images/person1.jpg";
import image2 from "../../images/person2.png";
import image3 from "../../images/person3.png";
import image4 from "../../images/person4.png";
import "../../styles/TryOnPage/Mannequin.css"

const Mannequin = () => {
  // State to track selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="tryon-top-left">
      <div className="mannequin-container">
        {/* Placeholder for the mannequin */}
        <div 
          className="mannequin" 
          style={{ 
            backgroundImage: `url(${selectedImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            width: '500px', 
            height: '500px' 
          }}
        ></div>
      </div>

      <div className="image-thumbnails">
        {/* Create a box for each image with padding and margin */}
        <div className="thumbnail-box" onClick={() => handleImageClick(image1)}>
          <img src={image1} alt="Person 1" className="thumbnail" />
        </div>
        <div className="thumbnail-box" onClick={() => handleImageClick(image2)}>
          <img src={image2} alt="Person 2" className="thumbnail" />
        </div>
        <div className="thumbnail-box" onClick={() => handleImageClick(image3)}>
          <img src={image3} alt="Person 3" className="thumbnail" />
        </div>
        <div className="thumbnail-box" onClick={() => handleImageClick(image4)}>
          <img src={image4} alt="Person 4" className="thumbnail" />
        </div>
      </div>
    </div>
  );
};

export default Mannequin;
