import React, { useEffect, useState } from 'react';
import { useTryOn } from '../../contexts/TryOnContext';
import Product from '../trymeon/Product';

const UserTryOn = () => {
  const { selectedImage } = useTryOn(); // Access the selected image from context
  const [storedImage, setStoredImage] = useState(null);

  // 페이지 로드 시 localStorage에서 이미지를 불러옴
  useEffect(() => {
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setStoredImage(JSON.parse(savedImage)); // 이미지가 있으면 상태에 저장
    }
  }, []);

  // selectedImage가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem('selectedImage', JSON.stringify(selectedImage));
      setStoredImage(selectedImage); // 상태 업데이트
    }
  }, [selectedImage]);

  // selectedImage가 없으면 storedImage 사용
  const images = storedImage ? [storedImage] : [];

  return (
    <div className="tryon-top-right">
      <div className="user-tryon-container">
        <Product images={images} />
      </div>
    </div>
  );
};

export default UserTryOn;
