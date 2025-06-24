// src/components/Card.jsx
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';    // 8x8 크기 증가
      case 'normal': return '90px';  // 6x6 유지
      case 'easy': return '120px';   // 4x4 유지
      default: return '120px';
    }
  }};
  height: ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';    // 높이도 동일하게 조정
      case 'normal': return '90px';
      case 'easy': return '120px';
      default: return '120px';
    }
  }};
  border-radius: 12px;
  cursor: pointer;
  perspective: 1500px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    width: ${props => {
      switch(props.difficulty) {
        case 'hard': return '40px';    // 모바일 8x8 크기 증가
        case 'normal': return '55px';
        case 'easy': return '80px';
        default: return '80px';
      }
    }};
    height: ${props => {
      switch(props.difficulty) {
        case 'hard': return '40px';
        case 'normal': return '55px';
        case 'easy': return '80px';
        default: return '80px';
      }
    }};
  }
`;

const StyledCard = styled.div`
  position: relative;
  width: 100%;  // 부모 크기에 맞춤
  height: 100%; // 부모 크기에 맞춤
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  ${props => props.isFlipped && `
    transform: rotateY(180deg);
  `}

  &.matched {
    animation: matched 0.6s ease-out;
  }

  @keyframes matched {
    0% { transform: rotateY(180deg) scale(1); }
    50% { transform: rotateY(180deg) scale(1.1); }
    100% { transform: rotateY(180deg) scale(1); }
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled(CardFace)`
  background: white;
  transform: rotateY(170deg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(45deg, #84A4F5, #6b8ce0);
  transform: rotateY(0deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;

  &::after {
    font-size: 2.5rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Card = ({ image, isFlipped, isMatched, onClick, difficulty }) => {
  return (
    <CardWrapper onClick={onClick} difficulty={difficulty}>
      <StyledCard isFlipped={isFlipped} className={isMatched ? 'matched' : ''}>
        <CardFront>
          <img src={image} alt="card" draggable="false" />
        </CardFront>
        <CardBack />
      </StyledCard>
    </CardWrapper>
  );
};

export default Card;