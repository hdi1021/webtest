// 홈 페이지 컴포넌트: 게임 시작 화면을 담당
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MomentreeFile from '../assets/Home/Momentree_persom.png'; // 중앙 카드 이미지

// 메인 컨테이너: 전체 페이지의 레이아웃 설정
const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 10%;
`;

// 왼쪽 영역: 타이틀과 설명, 시작 버튼 포함
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

// 텍스트 묶음: 제목, 부제목, 소제목
const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// 메인 타이틀
const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #4E4E4E;
  margin: 0;
`;

// 부제목
const SubTitle = styled.h2`
  font-size: 2rem;
  color: #747474;
  margin: 0;
  font-weight: 500;
  opacity: 0.9;
`;

// 소제목
const SmallTitle = styled.h3`
  font-size: 1.3rem;
  color: #ACACAC;
  margin: 0;
  font-weight: 400;
`;

// 게임 시작 버튼 (react-router의 Link 사용)
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

// 오른쪽 영역: 카드 애니메이션을 위한 영역
const RightSection = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px; // 3D 효과를 위한 설정
  padding: 2rem;
`;

// 카드들을 감싸는 컨테이너: hover 이벤트 발생 영역
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

// 개별 카드 스타일: 중앙 카드에 이미지 포함
const PreviewCard = styled.div`
  position: absolute;
  width: 200px;
  height: 190px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(132, 164, 245, 0.15);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: none; // 사용자 클릭 방지
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // 각 카드의 초기 위치
  &:nth-child(1) { 
    transform: translateX(-120px) rotate(-15deg);
  }
  &:nth-child(2) { 
    transform: translateX(0) rotate(0deg); 
    z-index: 2; // 중앙 카드가 가장 위
    background-image: url(${MomentreeFile});
    background-size: 110px 110px;
  }
  &:nth-child(3) { 
    transform: translateX(120px) rotate(15deg);
  }

  // 카드에 마우스를 올렸을 때의 애니메이션 효과
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

// 홈 컴포넌트 본문: 게임 시작 안내 및 카드 애니메이션
const Home = () => {
  return (
    <HomeContainer>
      {/* 왼쪽: 텍스트 설명 + 게임 시작 버튼 */}
      <LeftSection>
        <TextGroup>
          <Title>팬모리</Title>
          <SubTitle>최애 얼굴, 몇 초면 외우죠?</SubTitle>
          <SmallTitle>지금 바로 시작해보세요!</SmallTitle>
        </TextGroup>
        <StartButton to="/mode">게임 시작하기</StartButton>
      </LeftSection>

      {/* 오른쪽: 카드 애니메이션 영역 */}
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

// 컴포넌트 export
export default Home;