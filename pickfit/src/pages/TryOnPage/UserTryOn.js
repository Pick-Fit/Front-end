import React from 'react';
import { useTryOn } from '../../contexts/TryOnContext';
import Product from '../trymeon/Product';

const UserTryOn = () => {
  const { selectedImage } = useTryOn(); // Access the selected image from context

  // selectedImage가 없으면 빈 배열을 넘겨준다
  const images = selectedImage ? [selectedImage] : [];

  if (!selectedImage) {
    return <div>여기에 사용자가 Try On한 의상이 표시됩니다.</div>;
  }

  return (
    <div className="tryon-top-right">
      <div className="user-tryon-container">
        <Product images={images} />
      </div>
    </div>
  );
};

export default UserTryOn;
