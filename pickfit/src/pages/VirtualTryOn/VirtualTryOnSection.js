import React, { useState, useEffect } from "react";
import axios from "axios";

const VirtualTryOnSection = ({ selectedItemForProduct }) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [email, setEmail] = useState(""); // State to hold the email
  const [images, setImages] = useState([]); // 이미지 리스트 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedItemForModel, setSelectedItemForModel] = useState(null); // 클릭된 이미지 상태

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

  // 이미지 클릭 시 실행되는 함수
  const handleImageClick = (image) => {
    console.log("이미지 클릭: ", image);
    setSelectedItemForModel({
      src: image.imageUrl, // 이미지의 URL 설정
      id: image.id,
    });
  };

  const handleRegisterClick = async () => {
    const requestData = {
      userEmail: email || "이메일이 제공되지 않았습니다.",
      personImageUrl: selectedItemForModel ? selectedItemForModel.src : null,
      bigCategory: selectedItemForProduct ? selectedItemForProduct.bigCategory : null,
      clothImageUrl: selectedItemForProduct ? selectedItemForProduct.src : null,
      productId: selectedItemForProduct ? selectedItemForProduct.id : null,
    };

    console.log("전송될 데이터: ", requestData);

    try {
      const response = await axios.post("http://localhost:8080/trymeon/process", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        await fetchImages(); // 이미지 요청
      }
    } catch (error) {
      console.error("서버 오류: ", error.response ? error.response.data : error.message);
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
            <div key={image.id} className="image-item" onClick={() => handleImageClick(image)}>
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
            <img src={selectedItemForProduct.src} alt={`Selected ${selectedItemForProduct.id}`} />
          </div>
        )}
        {selectedItemForModel && (
          <div className="selected-item">
            <img src={selectedItemForModel.src} alt={`Selected Model ${selectedItemForModel.id}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTryOnSection;