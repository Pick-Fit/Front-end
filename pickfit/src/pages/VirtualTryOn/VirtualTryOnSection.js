import React, { useState, useEffect } from "react";
import axios from "axios";

const VirtualTryOnSection = ({
  selectedItemForProduct,
  selectedItemForModel,
}) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [email, setEmail] = useState(""); // State to hold the email
  const [images, setImages] = useState([]); // 이미지 리스트 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태


  const fetchImages = async () => {
  
    setLoading(true);
    setError(null);
  
    try {
  
      const response = await axios.get("http://localhost:8080/trymeon/images"); // 백엔드 API 호출
  
      if (response.status === 200 && response.data.length > 0) {
        setImages(response.data); // 이미지 리스트 저장
      } else {
        setImages([]);
        setError("이미지가 없습니다.");
      }
    } catch (err) {
  
      setError("이미지를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };
  
  // 컴포넌트가 마운트될 때 이미지 데이터를 가져옴
  useEffect(() => {
    fetchImages();
  }, []);
  

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
    // 이메일 로그 출력 (디버깅용)
  
    // 요청 데이터 추출
    const requestData = {
      userEmail: email || "이메일이 제공되지 않았습니다.",
      personImageUrl: selectedItemForModel ? selectedItemForModel.src : null,
      bigCategory: selectedItemForProduct ? selectedItemForProduct.bigCategory : null,
      clothImageUrl: selectedItemForProduct ? selectedItemForProduct.src : null,
      productId: selectedItemForProduct ? selectedItemForProduct.id : null,
    };
  
    // 백엔드에 요청 보내기
      const response = await axios.post("http://localhost:8080/trymeon/process", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        await fetchImages(); // 이미지 요청
      }
  };
  


  return (
    <div className="virtual-tryon-div">
      <div className="register-div">
        <div onClick={handleRegisterClick}>등록</div>
      </div>
      <div onClick={toggleBox} className="toggle-button">
        {isBoxVisible ? "닫기" : "열기"}
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : images.length > 0 ? (
        <div className="images-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.imageUrl} alt={`Image ${image.id}`} />

            </div>
          ))}
        </div>
      ) : (
        <p>이미지가 없습니다.</p>
      )}
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
      </div>
    </div>
  );
  
};

export default VirtualTryOnSection;
