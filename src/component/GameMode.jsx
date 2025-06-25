import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EasyImage from '../assets/Home/easy.png';
import NomalImage from '../assets/Home/nomal.png';
import HardImage from '../assets/Home/hard.png';

// 게임 모드 선택 컴포넌트: 난이도 선택 화면 구성

// 컨테이너 스타일: 전체 화면 레이아웃
const ModeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4E4E4E;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const ModesWrapper = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

// 모드 카드 스타일: 각 난이도 옵션의 디자인
const ModeCard = styled(Link)`
  width: 250px;
  height: 340px;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 10px 20px rgba(132, 164, 245, 0.1);
  transition: all 0.3s ease;

  // 호버 효과와 애니메이션 포함
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(132, 164, 245, 0.2);
  }

  @media (max-width: 1024px) {
    width: 220px;
    height: 320px;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 280px;
    height: auto;
    min-height: 300px;
    padding: 2rem;
  }
`;

const ModeTitle = styled.h2`
  font-size: 2.5rem;
  color: #84A4F5;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ModeDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ModeSpec = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

const ModeImage = styled.img`
  width: 80%;
  border-radius: 10px;
  margin-top: 4rem;

  @media (max-width: 768px) {
    width: 70%;
    margin-top: 2rem;
  }
`;

const GameMode = () => {
  return (
    <ModeContainer>
      <Title>게임 난이도 선택</Title>
      <ModesWrapper>
        {/* Easy 모드 카드 */}
        <ModeCard to="/image-upload?mode=easy">
          <ModeTitle>Easy</ModeTitle>
          <ModeDescription>처음이신가요?</ModeDescription>
          <ModeSpec>4 x 4 • 16장</ModeSpec>
          <ModeImage src={EasyImage} alt="Easy Mode" />
        </ModeCard>
        
        {/* Normal 모드 카드 */}
        <ModeCard to="/image-upload?mode=normal">
          <ModeTitle>Normal</ModeTitle>
          <ModeDescription>도전해보세요!</ModeDescription>
          <ModeSpec>6 x 6 • 36장</ModeSpec>
          <ModeImage src={NomalImage} alt="Normal Mode" />
        </ModeCard>
        
        {/* Hard 모드 카드 */}
        <ModeCard to="/image-upload?mode=hard">
          <ModeTitle>Hard</ModeTitle>
          <ModeDescription>진정한 고수라면?</ModeDescription>
          <ModeSpec>8 x 8 • 64장</ModeSpec>
          <ModeImage src={HardImage} alt="Hard Mode" />
        </ModeCard>
      </ModesWrapper>
    </ModeContainer>
  );
};

export default GameMode;