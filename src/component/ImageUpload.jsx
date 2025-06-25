import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const UploadContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  padding: 2rem; // 패딩 값 축소
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 중앙 정렬 추가
  gap: 1.5rem; // 요소들 사이 간격 조정
`;

const Title = styled.h1`
  color: #4E4E4E;
  font-size: 2rem; // 글자 크기 축소
  margin-bottom: 1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #84A4F5, #6b8ce0);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ImageCount = styled.p`
  color: #666;
  margin: 1rem 0;
`;

const SmallText = styled.p`
  color: #888;
  font-size: 0.8rem; // 글자 크기 축소
  margin: 0.8rem 0; // 마진 축소
  text-align: center;
  padding: 0.8rem;
  background: rgba(132, 164, 245, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
`;

const DropZone = styled.div`
  border: 1px dashed #84A4F5;
  border-radius: 10px;
  padding: 1.5rem; // 패딩 축소
  text-align: center;
  margin: 0.8rem 0; // 마진 축소
  background: rgba(132, 164, 245, 0.05);
  cursor: pointer;
  width: 100%;
  max-width: 300px; // 최대 너비 설정
  font-size: 1rem; // 글자 크기 축소

  &:hover {
    background: rgba(132, 164, 245, 0.1);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  width: 100%;
  max-width: 800px;  // 최대 너비 증가
  margin: 1rem auto;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  justify-content: flex-start;
`;

const PreviewCard = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex: 0 0 auto;  // flex-shrink를 0으로 설정하여 크기 고정
  margin: 0;  // 마진 제거
  transition: transform 0.3s ease;  // 애니메이션 추가

  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;  // 기본적으로 숨김
    transition: opacity 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  &:hover button {
    opacity: 1;  // 호버시 보임
  }
`;

// 이미지 업로드 컴포넌트: 사용자 이미지 선택 및 관리
const ImageUpload = () => {
  // 상태 관리
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');

  // 난이도별 최대 이미지 수 설정
  const getMaxImages = () => {
    switch(mode) {
      case 'easy': return 8;    // 4x4 = 16장 중 8쌍
      case 'normal': return 12; // 6x6 = 36장 중 18쌍
      case 'hard': return 16;   // 8x8 = 64장 중 32쌍
      default: return 8;
    }
  };

  const maxImages = getMaxImages();

  const getModeDescription = () => {
    switch(mode) {
      case 'easy': return '자신이 좋아하는 연예인 사진을 꼭 한장이상 넣어주시길 바랍니다.';
      case 'normal': return '자신이 좋아하는 연예인 사진을 꼭 한장이상 넣어주시길 바랍니다.';
      case 'hard': return '자신이 좋아하는 연예인 사진을 꼭 한장이상 넣어주시길 바랍니다.';
      default: return '';
    }
  };

  // 이미지 해시 생성 함수 추가
  const getImageHash = async (imageData) => {
    const data = await fetch(imageData).then(r => r.blob());
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const hash = btoa(reader.result).slice(0, 32);
        resolve(hash);
      };
      reader.readAsBinaryString(data);
    });
  };

  // 이미지 중복 체크 함수
  const isDuplicateImage = async (newImageData) => {
    const newHash = await getImageHash(newImageData);
    for (let image of images) {
      const existingHash = await getImageHash(image);
      if (newHash === existingHash) {
        return true;
      }
    }
    return false;
  };

  // 이미지 업로드 처리 수정
  const handleImageUpload = async (files) => {
    const remainingSlots = maxImages - images.length;
    
    if (files.length > remainingSlots) {
      return; // 최대 개수 초과시 처리 중단
    }

    const newImages = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      
      // Promise로 파일 읽기 작업 래핑
      const readFileAsDataURL = new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const newImage = await readFileAsDataURL;
      const isDuplicate = await isDuplicateImage(newImage);

      if (!isDuplicate) {
        newImages.push(newImage);
      }
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
    }
  };

  // 드래그 앤 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
  };

  const startGame = () => {
    navigate('/game-mode-select', {
      state: {
        userImages: images,
        difficulty: mode
      }
    });
  };

  return (
    <UploadContainer>
      <Title>나만의 이미지 선택하기</Title>
      <ImageCount>
        선택된 이미지: {images.length}/{maxImages}장
        {images.length < maxImages && 
          ` (${maxImages - images.length}장 더 선택 가능)`
        }
      </ImageCount>
      
      {images.length > 0 && (
        <PreviewGrid>
          {images.map((image, index) => (
            <PreviewCard key={index}>
              <img src={image} alt={`preview-${index}`} />
              <button onClick={() => {
                setImages(prev => prev.filter((_, i) => i !== index));
              }}>×</button>
            </PreviewCard>
          ))}
        </PreviewGrid>
      )}

      <DropZone
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('multipleFileInput').click()}
      >
        <p>이미지를 여기에 드래그하거나 클릭하여 선택하세요</p>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>
          (여러 장의 이미지를 한 번에 선택할 수 있습니다)
        </p>
        <FileInput
          id="multipleFileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
        />
      </DropZone>

      <SmallText>{getModeDescription()}</SmallText>
      <ButtonGroup>
        <StartButton 
          onClick={startGame}
          disabled={images.length === 0}
        >
          게임 시작하기
        </StartButton>
      </ButtonGroup>
    </UploadContainer>
  );
};

export default ImageUpload;