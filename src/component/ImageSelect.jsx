// styled-components를 사용해 컴포넌트별 스타일 정의
import styled from 'styled-components';
// React 훅 import
import { useState } from 'react';
// 페이지 이동 및 현재 위치 정보를 위한 react-router-dom 훅 import
import { useNavigate, useLocation } from 'react-router-dom';

// 전체 화면 컨테이너 스타일
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  padding: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 제목 스타일
const Title = styled.h1`
  color: #747474;
  margin-bottom: 2rem;
`;

// 이미지 그리드 스타일
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 2rem 0;
`;

// 개별 이미지 카드 스타일 (선택된 경우 테두리 표시)
const ImageCard = styled.div`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${props => props.selected ? '#84A4F5' : 'transparent'};

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

// 시작 버튼 스타일
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

// 이미지 선택 컴포넌트 정의
const ImageSelect = () => {
  // 선택된 이미지 배열 상태
  const [selectedImages, setSelectedImages] = useState([]);

  // 페이지 이동 및 현재 쿼리 파라미터 정보
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');

  // 기본 제공 이미지 목록
  const defaultImages = [
    '/images/default1.jpg',
    '/images/default2.jpg',
    // 추가 이미지 경로
  ];

  // 난이도에 따라 최대 선택 가능 이미지 수 반환
  const getMaxImages = () => {
    switch(mode) {
      case 'easy': return 8;
      case 'normal': return 12;
      case 'hard': return 16;
      default: return 8;
    }
  };

  // 이미지 선택/해제 처리 함수
  const toggleImageSelection = (image) => {
    if (selectedImages.includes(image)) {
      // 선택 해제
      setSelectedImages(prev => prev.filter(img => img !== image));
    } else if (selectedImages.length < getMaxImages()) {
      // 새로 선택
      setSelectedImages(prev => [...prev, image]);
    }
  };

  // 게임 시작 버튼 클릭 시 호출되는 함수
  const startGame = () => {
    navigate('/game', {
      state: {
        selectedImages,    // 선택한 이미지들 전달
        difficulty: mode   // 난이도 정보 전달
      }
    });
  };

  // JSX 반환 (화면 UI 구성)
  return (
    <Container>
      <Title>기본 이미지 선택하기</Title>
      <ImageGrid>
        {defaultImages.map((image, index) => (
          <ImageCard
            key={index}
            selected={selectedImages.includes(image)}
            onClick={() => toggleImageSelection(image)}
          >
            <img src={image} alt={`default-${index}`} />
          </ImageCard>
        ))}
      </ImageGrid>
      <StartButton 
        onClick={startGame}
        disabled={selectedImages.length === 0}
      >
        선택한 이미지로 시작
      </StartButton>
    </Container>
  );
};

// 컴포넌트 내보내기
export default ImageSelect;