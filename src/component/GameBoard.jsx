import styled from 'styled-components';
import Card from './Card';

// 게임 보드 스타일 컴포넌트: 카드들을 그리드 형태로 배치
const Board = styled.div`
  display: grid;
  // 난이도에 따른 그리드 열 개수와 카드 크기 설정
  grid-template-columns: repeat(${props => props.size}, ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';    // 8x8 크기 (어려움)
      case 'normal': return '90px';  // 6x6 크기 (보통)
      case 'easy': return '120px';   // 4x4 크기 (쉬움)
      default: return '120px';
    }
  }});
  // 난이도별 카드 간격 조정
  gap: ${props => props.difficulty === 'hard' ? '0.5rem' : '0.8rem'};
  width: fit-content;
  margin: 2rem auto;
  // 난이도별 패딩 조정
  padding: ${props => props.difficulty === 'hard' ? '1.5rem' : '1rem'};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  // 모바일 ���응형 스타일
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.size}, ${props => {
      switch(props.difficulty) {
        case 'hard': return '40px';    // 모바일 8x8
        case 'normal': return '55px';   // 모바일 6x6
        case 'easy': return '80px';     // 모바일 4x4
        default: return '80px';
      }
    }});
    gap: ${props => props.difficulty === 'hard' ? '0.3rem' : '0.5rem'};
    padding: 0.5rem;
  }
`;

// GameBoard 컴포넌트: 카드 게임의 메인 보드를 렌더링
const GameBoard = ({ cards, onCardClick, difficulty }) => {
  // 카드 배열의 크기로 그리드 크기 계산 (4x4, 6x6, 8x8)
  const size = Math.sqrt(cards.length);
  // 카드 개수에 따른 난이도 설정
  const difficultyLevel = cards.length === 64 ? 'hard' : 
                         cards.length === 36 ? 'normal' : 'easy';

  return (
    <Board size={size} difficulty={difficultyLevel}>
      {/* 각 카드 컴포넌트 렌더링 */}
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          isFlipped={card.isFlipped}    // 카드가 뒤집혔는지 여부
          isMatched={card.isMatched}    // 카드가 매칭되었는지 여부
          // 카드가 뒤집히지 않았고 매칭되지 않은 경우에만 클릭 가능
          onClick={() => !card.isFlipped && !card.isMatched && onCardClick(index)}
          difficulty={difficultyLevel}
        />
      ))}
    </Board>
  );
};

export default GameBoard;