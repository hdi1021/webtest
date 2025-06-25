// 게임 모드 선택 컴포넌트: 타임어택, 일반, 2인 모드 선택 화면

import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiTimer } from 'react-icons/bi';  // 타이머 아이콘
import { BsPlayCircle } from 'react-icons/bs'; // 일반 플레이 아이콘
import { FaUserFriends } from 'react-icons/fa'; // 2인 플레이 아이콘

// 모드 카드: 각 게임 모드를 표시하는 카드
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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(132, 164, 245, 0.2);
  }
`;

// 메인 컨테이너: 전체 화면 레이아웃
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

// 타이틀 스타일 추가
const Title = styled.h1`
  color: #4E4E4E;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

// 게임 모드 배치 컨테이너
const ModesContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

// 모드 아이콘: 각 모드를 대표하는 아이콘
const ModeIcon = styled.div`
  font-size: 3rem;
  color: #84A4F5;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  // 호버 시 아이콘 확대 효과
  ${ModeCard}:hover & {
    transform: scale(1.1);
  }
`;

const ModeTitle = styled.h2`
  color: #84A4F5;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ModeDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #84A4F5, #6b8ce0);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

// 게임 모드 선택 컴포넌트: 타임어택, 일반, 2인 모드 선택 화면
const GameModeSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty } = location.state || {};

  // 게임 시작 함수: 선택된 모드에 따라 게임 화면으로 이동
  const startGame = (mode) => {
    navigate(`/game`, {
      state: {
        userImages: location.state?.userImages,
        difficulty: location.state?.difficulty,
        gameMode: mode
      }
    });
  };

  return (
    <Container>
      <Title>게임 모드 선택</Title>
      <ModesContainer>
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