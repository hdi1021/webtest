// 게임 모드 선택 컴포넌트: 타임어택, 일반, 2인 모드 선택 화면

import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiTimer } from 'react-icons/bi';  // 타이머 아이콘
import { BsPlayCircle } from 'react-icons/bs'; // 일반 플레이 아이콘
import { FaUserFriends } from 'react-icons/fa'; // 2인 플레이 아이콘

// 모드 카드 스타일: 각 게임 모드를 나타내는 카드 UI
const ModeCard = styled.div`
  width: 280px;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 10px 20px rgba(132, 164, 245, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 카드에 마우스를 올렸을 때 약간 떠오르고 그림자 진해짐
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(132, 164, 245, 0.2);
  }
`;

// 전체 컨테이너: 페이지 전체 레이아웃 설정
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem; // 카드와 타이틀 사이 간격
`;

// 페이지 타이틀 스타일
const Title = styled.h1`
  color: #4E4E4E;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

// 게임 모드 카드들을 감싸는 컨테이너, 가로로 배치됨
const ModesContainer = styled.div`
  display: flex;
  gap: 2rem; // 카드 사이 간격
`;

// 모드 아이콘 스타일: 카드 내 아이콘 크기 및 색상 지정
const ModeIcon = styled.div`
  font-size: 3rem;
  color: #84A4F5;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  // 카드에 마우스 오버 시 아이콘이 살짝 커짐
  ${ModeCard}:hover & {
    transform: scale(1.1);
  }
`;

// 모드 제목 스타일
const ModeTitle = styled.h2`
  color: #84A4F5;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

// 모드 설명 텍스트 스타일
const ModeDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

// 각 모드 카드 내의 시작 버튼 스타일
const StartButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #84A4F5, #6b8ce0);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%; // 카드 가로폭에 맞춤
  transition: all 0.2s ease;

  // 버튼 호버 시 약간 투명해짐
  &:hover {
    opacity: 0.9;
  }
`;

// 메인 컴포넌트: 게임 모드 선택 UI 및 동작 정의
const GameModeSelect = () => {
  // 페이지 이동과 현재 경로 정보 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  // 게임 시작 함수
  // 선택한 모드에 따라 /game 경로로 이동하며
  // 선택한 난이도, 사용자 이미지, 게임 모드 상태 전달
  const startGame = (mode) => {
    navigate(`/game`, {
      state: {
        userImages: location.state?.userImages, // 이미지 배열
        difficulty: location.state?.difficulty, // 난이도
        gameMode: mode // 선택한 게임 모드
      }
    });
  };

  return (
    <Container>
      <Title>게임 모드 선택</Title>

      {/* 각 모드별 카드들을 가로로 배치 */}
      <ModesContainer>
        {/* 타임어택 모드 카드 */}
        <ModeCard onClick={() => startGame('timeAttack')}>
          <ModeIcon>
            <BiTimer />
          </ModeIcon>
          <ModeTitle>타임어택</ModeTitle>
          <ModeDescription>
            제한시간 내에<br />모든 카드를 맞춰보세요!
          </ModeDescription>
          <StartButton>타임어택 시작</StartButton>
        </ModeCard>

        {/* 일반 모드 카드 */}
        <ModeCard onClick={() => startGame('normal')}>
          <ModeIcon>
            <BsPlayCircle />
          </ModeIcon>
          <ModeTitle>일반 모드</ModeTitle>
          <ModeDescription>
            여유롭게<br />카드를 맞춰보세요
          </ModeDescription>
          <StartButton>일반 게임 시작</StartButton>
        </ModeCard>

        {/* 2인 모드 카드 */}
        <ModeCard onClick={() => startGame('twoPlayer')}>
          <ModeIcon>
            <FaUserFriends />
          </ModeIcon>
          <ModeTitle>2인 모드</ModeTitle>
          <ModeDescription>
            친구와 함께<br />대결해보세요!
          </ModeDescription>
          <StartButton>2인 게임 시작</StartButton>
        </ModeCard>
      </ModesContainer>
    </Container>
  );
};

export default GameModeSelect;