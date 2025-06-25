// 필요한 라이브러리 import
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// 스타일 컴포넌트 정의 영역

// 전체 업로드 컨테이너
const UploadContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

// 제목 텍스트
const Title = styled.h1`
  color: #4E4E4E;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

// 게임 시작 버튼
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

// 버튼들을 감싸는 그룹
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

// 이미지 개수 표시 텍스트
const ImageCount = styled.p`
  color: #666;
  margin: 1rem 0;
`;

// 안내 문구 스타일
const SmallText = styled.p`
  color: #888;
  font-size: 0.8rem;
  margin: 0.8rem 0;
  text-align: center;
  padding: 0.8rem;
  background: rgba(132, 164, 245, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
`;

// 드래그 영역 스타일
const DropZone = styled.div`
  border: 1px dashed #84A4F5;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  margin: 0.8rem 0;
  background: rgba(132, 164, 245, 0.05);
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;

  &:hover {
    background: rgba(132, 164, 245, 0.1);
  }
`;

// 실제 파일 input (숨겨짐)
const FileInput = styled.input`
  display: none;
`;

// 업로드한 이미지들을 보여줄 그리드
const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  padding: 0.8rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  justify-content: flex-start;
`;

// 각 이미지 미리보기 카드
const PreviewCard = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  flex: 0 0 auto;
  margin: 0;
  transition: transform 0.3s ease;

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
    opacity: 0;
    transition: opacity 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  &:hover button {
    opacity: 1;
  }
`;

// 메인 컴포넌트
const ImageUpload = () => {
  // 이미지 상태 저장
  const [images, setImages] = useState([]);

  // 라우팅 정보 가져오기
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');

  // 난이도에 따른 최대 이미지 수 반환
  const getMaxImages = () => {
    switch(mode) {
      case 'easy': return 8;
      case 'normal': return 12;
      case 'hard': return 16;
      default: return 8;
    }
  };

  const maxImages = getMaxImages();

  // 난이도별 안내 문구
  const getModeDescription = () => {
    return '자신이 좋아하는 연예인 사진을 꼭 한장이상 넣어주시길 바랍니다.';
  };

  // 이미지 해시를 생성하여 중복 확인
  const getImageHash = async (imageData) => {
    const data = await fetch(imageData).then(r => r.blob());
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const hash = btoa(reader.result).slice(0, 32); // base64 인코딩 후 자름
        resolve(hash);
      };
      reader.readAsBinaryString(data);
    });
  };

  // 중복 이미지 여부 확인
  const isDuplicateImage = async (newImageData) => {
    const newHash = await getImageHash(newImageData);
    for (let image of images) {
      const existingHash = await getImageHash(image);
      if (newHash === existingHash) return true;
    }
    return false;
  };

  // 이미지 업로드 처리 함수
  const handleImageUpload = async (files) => {
    const remainingSlots = maxImages - images.length;
    if (files.length > remainingSlots) return;

    const newImages = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();

      // 파일 읽기 비동기 처리
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

    // 새로운 이미지 추가
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

  // 드래그 중일 때 기본 동작 막기
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 파일 input 변경 이벤트 처리
  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
  };

  // 게임 시작 버튼 클릭 시 이동
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
      
      {/* 이미지 미리보기 영역 */}
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

      {/* 드롭 영역 및 파일 업로드 */}
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

      {/* 안내 문구 */}
      <SmallText>{getModeDescription()}</SmallText>

      {/* 게임 시작 버튼 */}
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

// 컴포넌트 export
export default ImageUpload;