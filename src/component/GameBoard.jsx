import styled from 'styled-components';
import Card from './Card';

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, ${props => {
    switch(props.difficulty) {
      case 'hard': return '70px';    // 8x8 크기 증가
      case 'normal': return '90px';
      case 'easy': return '120px';
      default: return '120px';
    }
  }});
  gap: ${props => props.difficulty === 'hard' ? '0.5rem' : '0.8rem'};  // hard 모드의 gap 조정
  width: fit-content;
  margin: 2rem auto;
  padding: ${props => props.difficulty === 'hard' ? '1.5rem' : '1rem'}; // hard 모드의 padding 증가
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.size}, ${props => {
      switch(props.difficulty) {
        case 'hard': return '40px';    // 모바일 8x8 크기 증가
        case 'normal': return '55px';
        case 'easy': return '80px';
        default: return '80px';
      }
    }});
    gap: ${props => props.difficulty === 'hard' ? '0.3rem' : '0.5rem'};
    padding: 0.5rem;
  }
`;

const GameBoard = ({ cards, onCardClick, difficulty }) => {
  const size = Math.sqrt(cards.length); // 카드 개수의 제곱근으로 크기 계산
  const difficultyLevel = cards.length === 64 ? 'hard' : 
                         cards.length === 36 ? 'normal' : 'easy';

  return (
    <Board size={size} difficulty={difficultyLevel}>
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => !card.isFlipped && !card.isMatched && onCardClick(index)}
          difficulty={difficultyLevel}
        />
      ))}
    </Board>
  );
};

export default GameBoard;