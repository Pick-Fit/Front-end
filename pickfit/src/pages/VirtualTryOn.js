import React, { useState } from 'react';
import '../styles/VirtualTryOn.css';  // 스타일 파일을 임포트

const VirtualTryOn = () => {
  // 이미지 상태를 관리하기 위한 useState
  const [image, setImage] = useState(null);

  // 드래그한 이미지를 처리하는 함수
  const handleDrop = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const file = e.dataTransfer.files[0];  // 드래그된 첫 번째 파일
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));  // 이미지 URL 생성하여 상태 업데이트
    }
  };

  // 드래그 오버 시 기본 동작 방지
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 클릭 시 파일 선택을 처리하는 함수
  const handleClick = () => {
    document.getElementById('file-input').click();  // 숨겨진 파일 입력창 클릭
  };

  // 파일 입력창에서 이미지 선택 시 처리하는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // 선택된 파일
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));  // 이미지 URL 생성하여 상태 업데이트
    }
  };

  return (
    <div>
      {/* 이미지 등록을 위한 드래그 및 클릭 영역 */}
      <div className='border-box3'>
        <div>
            <div
                className="virtual-try-on-box"
                onDrop={handleDrop}  // 드래그 후 이미지 등록
                onDragOver={handleDragOver}  // 드래그 오버 시 기본 동작 방지
                onClick={handleClick}  // 클릭 시 파일 선택
            >
                <div>Virtual Try On</div>
                {image ? (
                <img
                    src={image}
                    alt="Virtual Try On"
                    className="virtual-try-on-image"
                />
                ) : (
                <p>드래그하거나 클릭하여 이미지를 등록하세요.</p>
                )}
            </div>

            {/* 숨겨진 파일 입력창 */}
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}  // 파일 선택 시 처리
                style={{ display: 'none' }}  // 파일 입력창을 숨깁니다.
            />
            </div>
        </div>
    </div>
  );
};

export default VirtualTryOn;
