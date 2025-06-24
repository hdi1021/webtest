import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EasyImage from '../assets/Home/easy.png';
import NomalImage from '../assets/Home/nomal.png';
import HardImage from '../assets/Home/hard.png';

const ModeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4E4E4E;
`;

const ModesWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(132, 164, 245, 0.2);
  }
`;

const ModeTitle = styled.h2`
  font-size: 2.5rem;
  color: #84A4F5;
  margin-top: 1rem;
  margin-bottom: 1rem;
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

const GameMode = () => {
  return (
    <ModeContainer>
      <Title>게임 난이도 선택</Title>
      <ModesWrapper>
        <ModeCard to="/image-upload?mode=easy">
          <ModeTitle>Easy</ModeTitle>
          <ModeDescription>처음이신가요?</ModeDescription>
          <ModeSpec>4 x 4 • 16장</ModeSpec>
          <img src={EasyImage} alt="Easy Mode" style={{ width: '80%', borderRadius: '10px', marginTop: '4rem' }} />
        </ModeCard>
        
        <ModeCard to="/image-upload?mode=normal">
          <ModeTitle>Normal</ModeTitle>
          <ModeDescription>도전해보세요!</ModeDescription>
          <ModeSpec>6 x 6 • 36장</ModeSpec>
          <img src={NomalImage} alt="Normal Mode" style={{ width: '80%', borderRadius: '10px', marginTop: '4rem' }} />
        </ModeCard>
        
        <ModeCard to="/image-upload?mode=hard">
          <ModeTitle>Hard</ModeTitle>
          <ModeDescription>진정한 고수라면?</ModeDescription>
          <ModeSpec>8 x 8 • 64장</ModeSpec>
          <img src={HardImage} alt="Hard Mode" style={{ width: '80%', borderRadius: '10px', marginTop: '4rem' }} />
        </ModeCard>
      </ModesWrapper>
    </ModeContainer>
  );
};

export default GameMode;