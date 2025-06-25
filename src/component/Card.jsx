// src/components/Card.jsx

// 카드 컴포넌트: 개별 카드의 디자인과 동작을 담당
import styled from 'styled-components';

// 카드 래퍼: 카드의 크기와 3D 효과를 관리
const CardWrapper = styled.div`
  // 난이도별 카드 크기 설정
  width: ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';    // 8x8 그리드용 크기
      case 'normal': return '90px';  // 6x6 그리드용 크기
      case 'easy': return '120px';   // 4x4 그리드용 크기
      default: return '120px';
    }
  }};
  height: ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';
      case 'normal': return '90px';
      case 'easy': return '120px';
      default: return '120px';
    }
  }};
  border-radius: 12px;
  cursor: pointer;
  perspective: 1500px; // 3D 효과를 위한 원근감
  transform-style: preserve-3d;

  // 모바일 환경에서 카드 크기 조정
  @media (max-width: 768px) {
    width: ${props => {
      switch(props.difficulty) {
        case 'hard': return '40px';
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

// 카드 본체: 뒤집기 애니메이션과 매칭 효과
const StyledCard = styled.div`
  position: relative;
  width: 100%;  // 부모 크기에 맞춤
  height: 100%; // 부모 크기에 맞춤
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  // 카드가 뒤집혔을 때 Y축 회전
  ${props => props.isFlipped && `
    transform: rotateY(180deg);
  `}

  // 매칭 성공 시 애니메이션 효과
  &.matched {
    animation: matched 0.6s ease-out;
  }

  @keyframes matched {
    0% { transform: rotateY(180deg) scale(1); }
    50% { transform: rotateY(180deg) scale(1.1); }
    100% { transform: rotateY(180deg) scale(1); }
  }
`;

// 카드 앞면과 뒷면의 공통 스타일
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; // 뒷면 숨김
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 카드 앞면: 실제 이미지 표시
const CardFront = styled(CardFace)`
  background: white;
  transform: rotateY(170deg); // 살짝 회전 효과

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

// 카드 뒷면: 기본 디자인(색상, 테두리 등)
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

// Card 컴포넌트: props로 이미지, 상태, 클릭 이벤트, 난이도 전달
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