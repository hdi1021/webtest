import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MomentreeFile from '../assets/Home/Momentree_persom.png';

const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 10%;
`;

const LeftSection = styled.div`
  flex: 0.8;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #4E4E4E;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  color: #747474;
  margin: 0;
  font-weight: 500;
  opacity: 0.9;
`;

const SmallTitle = styled.h3`
  font-size: 1.3rem;
  color: #ACACAC;
  margin: 0;
  font-weight: 400;
`;

const StartButton = styled(Link)`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #84A4F5, #6b8ce0);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: white;
    color: #84A4F5;
    border: 2px solid #84A4F5;
  }
`;

const RightSection = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  padding: 2rem;
`;

const CardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const PreviewCard = styled.div`
  position: absolute;
  width: 200px;
  height: 190px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(132, 164, 245, 0.15);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: none;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &:nth-child(1) { 
    transform: translateX(-120px) rotate(-15deg);
  }
  &:nth-child(2) { 
    transform: translateX(0) rotate(0deg); 
    z-index: 2;
    background-image: url(${MomentreeFile});
    background-size: 110px 110px;
  }
  &:nth-child(3) { 
    transform: translateX(120px) rotate(15deg);
  }

  // 호버 시 효과
  ${CardContainer}:hover & {
    &:nth-child(1) { 
      transform: translateX(-180px) rotate(-20deg) translateY(20px); 
    }
    &:nth-child(2) { 
      transform: translateX(0) rotate(0deg) translateY(-20px) scale(1.1);
      box-shadow: 0 20px 40px rgba(132, 164, 245, 0.3);
    }
    &:nth-child(3) { 
      transform: translateX(180px) rotate(20deg) translateY(20px);
    }
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <LeftSection>
        <TextGroup>
          <Title>팬모리</Title>
          <SubTitle>최애 얼굴, 몇 초면 외우죠?</SubTitle>
          <SmallTitle>지금 바로 시작해보세요!</SmallTitle>
        </TextGroup>
        <StartButton to="/mode">게임 시작하기</StartButton>
      </LeftSection>
      <RightSection>
        <CardContainer>
          <PreviewCard />
          <PreviewCard />
          <PreviewCard />
        </CardContainer>
      </RightSection>
    </HomeContainer>
  );
};

export default Home;