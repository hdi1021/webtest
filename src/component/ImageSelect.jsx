
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  padding: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #747474;
  margin-bottom: 2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 2rem 0;
`;

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

const ImageSelect = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');

  const defaultImages = [
    // Add your default image URLs here
    '/images/default1.jpg',
    '/images/default2.jpg',
    // ... more default images
  ];

  const getMaxImages = () => {
    switch(mode) {
      case 'easy': return 8;
      case 'normal': return 12;
      case 'hard': return 16;
      default: return 8;
    }
  };

  const toggleImageSelection = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(prev => prev.filter(img => img !== image));
    } else if (selectedImages.length < getMaxImages()) {
      setSelectedImages(prev => [...prev, image]);
    }
  };

  const startGame = () => {
    navigate('/game', {
      state: {
        selectedImages,
        difficulty: mode
      }
    });
  };

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

export default ImageSelect;