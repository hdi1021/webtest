import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import { defaultCards } from '../assets/defaultCards';  // import 구문 수정

// 스타일 컴포넌트들
// 게임 전체 컨테이너: 2인 모드일 때 화면을 반으로 나누는 배경 적용
const GameContainer = styled.div`
  min-height: 100vh;
  background: ${props => 
    props.gameMode === 'twoPlayer' 
    ? 'linear-gradient(90deg, rgba(132, 164, 245, 0.1) 50%, rgba(245, 132, 132, 0.1) 50%)'
    : 'linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%)'
  };
  padding: 2rem;
`;

// 게임 상단 정보 표시 영역
const GameHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameInfo = styled.div`
  display: flex;
  gap: 2rem;
`;

const InfoBox = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(132, 164, 245, 0.1);
  
  h3 {
    color: #666;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
  }
  
  p {
    color: #84A4F5;
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const ExitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: white;
  border: 2px solid #84A4F5;
  color: #84A4F5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #84A4F5;
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  h2 {
    color: #84A4F5;
    margin-bottom: 1rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.8rem 2rem;
    background: #84A4F5;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const CountdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CountdownNumber = styled.div`
  font-size: 8rem;
  color: white;
  animation: scaleNumber 1s ease-in-out;

  @keyframes scaleNumber {
    0% { transform: scale(2); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
`;

const PlayerSection = styled.div`
  background: ${props => 
    props.isActive 
      ? props.isFirstPlayer 
        ? 'rgba(132, 164, 245, 0.2)' 
        : 'rgba(245, 132, 132, 0.2)'
      : 'transparent'
  };
  padding: 1rem;
  border-radius: 12px;
  transition: background 0.3s ease;
`;

const PlayerScore = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 2rem;
  
  ${PlayerSection} {
    flex: 1;
    margin: 0 1rem;
  }
`;

const PlayerInfo = styled.div`
  color: ${props => props.isFirstPlayer ? '#84A4F5' : '#F58484'};
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  p {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

// 난이도별 게임 설정 반환 함수
const getDifficultyConfig = (difficulty) => {
  if (typeof difficulty === 'string') {
    switch (difficulty) {
      case 'hard': return { size: 8, rows: 8, cols: 8, pairs: 32, time: 120 };
      case 'normal': return { size: 6, rows: 6, cols: 6, pairs: 18, time: 90 };
      case 'easy': return { size: 4, rows: 4, cols: 4, pairs: 8, time: 60 };
      default: return { size: 4, rows: 4, cols: 4, pairs: 8, time: 60 };
    }
  }
  return {
    size: difficulty?.size || 4,
    rows: difficulty?.rows || 4,
    cols: difficulty?.cols || 4,
    pairs: difficulty?.pairs || 8,
    time: difficulty?.time || 60,
  };
};

// 메인 게임 컴포넌트
const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 라우터로부터 난이도, 게임모드, 사용자 이미지 정보 받아오기
  const { difficulty, gameMode, userImages } = location.state || {};

  // 난이도 설정 가져오기
  const difficultyConfig = getDifficultyConfig(difficulty);

  // 상태 관리
  const [cards, setCards] = useState([]); // 카드 배열
  const [timer, setTimer] = useState(gameMode === 'timeAttack' ? difficultyConfig.time : 0); // 타이머
  const [moves, setMoves] = useState(0); // 시도 횟수
  const [matchedPairs, setMatchedPairs] = useState([]); // 매칭된 카드 쌍
  const [matchedPairsPlayer1, setMatchedPairsPlayer1] = useState([]); // 플레이어1 매칭
  const [matchedPairsPlayer2, setMatchedPairsPlayer2] = useState([]); // 플레이어2 매칭
  const [flippedCards, setFlippedCards] = useState([]); // 현재 뒤집힌 카드
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지
  const [countdown, setCountdown] = useState(null); // 게임 시작 카운트다운
  const [gameReady, setGameReady] = useState(false); // 게임 준비 상태
  const [isGameCleared, setIsGameCleared] = useState(false); // 게임 클리어 상태
  const [currentPlayer, setCurrentPlayer] = useState(1); // 현재 플레이어
  const [playerScores, setPlayerScores] = useState({ 1: 0, 2: 0 }); // 플레이어 점수

  // 게임 초기화 함수
  const initializeGame = () => {
    const totalPairs = difficultyConfig.pairs;
    const gameImages = [];

    // 기본 이미지만으로도 게임이 가능하도록 수정
    const requiredPairs = totalPairs;
    const repeatedDefaultImages = Array(Math.ceil(requiredPairs / defaultCards.length))
      .fill(defaultCards)
      .flat()
      .slice(0, requiredPairs)
      .map(card => card.image);

    // 사용자 이미지가 있는 경우 먼저 사용
    if (userImages && userImages.length > 0) {
      const userImagePairs = userImages.map(img => [img, img]).flat();
      gameImages.push(...userImagePairs);
    }

    // 남은 공간을 기본 이미지로 채움
    const remainingPairs = totalPairs - (gameImages.length / 2);
    if (remainingPairs > 0) {
      repeatedDefaultImages.forEach(img => {
        if (gameImages.length < totalPairs * 2) {
          gameImages.push(img, img);
        }
      });
    }

    const shuffledCards = gameImages
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setMatchedPairs([]);
    setMatchedPairsPlayer1([]);
    setMatchedPairsPlayer2([]);
    setMoves(0);
    setPlayerScores({ 1: 0, 2: 0 });
    setCurrentPlayer(1);
    setFlippedCards([]);
    setIsGameCleared(false);
    setShowModal(false);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (clickedIndex) => {
    if (flippedCards.length === 2) return;
    if (cards[clickedIndex].isMatched) return;
    if (flippedCards.includes(clickedIndex)) return;

    const newCards = [...cards];
    newCards[clickedIndex].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      setTimeout(() => {
        const updatedCards = [...newCards];
        if (newCards[firstIndex].image === newCards[secondIndex].image) {
          updatedCards[firstIndex].isMatched = true;
          updatedCards[secondIndex].isMatched = true;
          if (gameMode === 'twoPlayer') {
            if (currentPlayer === 1) {
              setMatchedPairsPlayer1(prev => [...prev, newCards[firstIndex].image]);
            } else {
              setMatchedPairsPlayer2(prev => [...prev, newCards[firstIndex].image]);
            }
            setPlayerScores(prev => ({
              ...prev,
              [currentPlayer]: prev[currentPlayer] + 1
            }));
          } else {
            setMatchedPairs(prev => [...prev, newCards[firstIndex].image]);
          }
        } else {
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          if (gameMode === 'twoPlayer') {
            setCurrentPlayer(current => current === 1 ? 2 : 1);
          }
        }
        setCards(updatedCards);
        setFlippedCards([]);
      }, 1000);
      setMoves(moves => moves + 1);
    }
  };

  // 게임 시작 시 카운트다운 효과
  useEffect(() => {
    setGameReady(true);
    setCountdown(3);

    const countInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countInterval);
          setTimeout(() => {
            setCountdown(null);
            initializeGame();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countInterval);
    // eslint-disable-next-line
  }, []);

  // 타이머 관리 효과
  useEffect(() => {
    if (countdown === null && gameReady && !isGameCleared) {
      const timerInterval = setInterval(() => {
        if (gameMode === 'timeAttack') {
          setTimer(prevTimer => {
            if (prevTimer <= 1) {
              clearInterval(timerInterval);
              setShowModal(true);
              setModalMessage('시간 초과! 게임 오버');
              return 0;
            }
            return prevTimer - 1;
          });
        } else if (gameMode === 'normal') {
          setTimer(prevTimer => prevTimer + 1);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [gameMode, countdown, gameReady, isGameCleared]);

  // 게임 클리어 체크 효과
  useEffect(() => {
    if (gameMode === 'twoPlayer') {
      const requiredPairs = difficultyConfig.pairs;
      if (matchedPairsPlayer1.length + matchedPairsPlayer2.length === requiredPairs) {
        setIsGameCleared(true);
        setShowModal(true);
      }
    } else {
      const requiredPairs = difficultyConfig.pairs;
      if (matchedPairs.length === requiredPairs) {
        setIsGameCleared(true);
        setShowModal(true);
        const message = gameMode === 'timeAttack'
          ? `축하합니다! 클리어하셨습니다!`
          : `축하합니다! 클리어하셨습니다!`;
        setModalMessage(message);
      }
    }
    // eslint-disable-next-line
  }, [matchedPairs, matchedPairsPlayer1, matchedPairsPlayer2, timer, gameMode, difficultyConfig]);

  // 시간 포맷팅 함수
  const formatTime = (seconds, isResult = false) => {
    if (seconds < 0) return '0분 0초';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (gameMode === 'timeAttack' && !isResult) {
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    } else {
      if (mins === 0) return `${secs}초`;
      return `${mins}분 ${secs}초`;
    }
  };

  return (
    <GameContainer gameMode={gameMode}>
      {countdown !== null && (
        <CountdownOverlay>
          <CountdownNumber>
            {countdown === 0 ? 'START!' : countdown}
          </CountdownNumber>
        </CountdownOverlay>
      )}
      {countdown === null && (
        <>
          {gameMode === 'twoPlayer' && (
            <PlayerScore>
              <PlayerSection isFirstPlayer isActive={currentPlayer === 1}>
                <PlayerInfo isFirstPlayer>
                  <h3>플레이어 1</h3>
                  <p>{playerScores[1]}점</p>
                </PlayerInfo>
              </PlayerSection>
              <PlayerSection isActive={currentPlayer === 2}>
                <PlayerInfo>
                  <h3>플레이어 2</h3>
                  <p>{playerScores[2]}점</p>
                </PlayerInfo>
              </PlayerSection>
            </PlayerScore>
          )}

          <GameHeader>
            {gameMode !== 'twoPlayer' && (
              <GameInfo>
                <InfoBox>
                  <h3>{gameMode === 'timeAttack' ? '남은 시간' : '경과 시간'}</h3>
                  <p>{formatTime(timer)}</p>
                </InfoBox>
                <InfoBox>
                  <h3>시도 횟수</h3>
                  <p>{moves}</p>
                </InfoBox>
              </GameInfo>
            )}
            <ExitButton onClick={() => navigate('/mode')}>
              게임 종료
            </ExitButton>
          </GameHeader>

          <GameBoard
            cards={cards}
            onCardClick={handleCardClick}
            difficulty={{
              size: difficultyConfig.size,
              rows: difficultyConfig.rows,
              cols: difficultyConfig.cols,
            }}
          />

          {showModal && gameMode === 'twoPlayer' && (
            <Modal>
              <h2>게임 종료!</h2>
              <p>플레이어 1: {playerScores[1]}점</p>
              <p>플레이어 2: {playerScores[2]}점</p>
              <h3>
                {playerScores[1] === playerScores[2]
                  ? '무승부!'
                  : `플레이어 ${playerScores[1] > playerScores[2] ? '1' : '2'} 승리!`
                }
              </h3>
              <button onClick={() => navigate('/mode')}>
                난이도 선택으로 돌아가기
              </button>
            </Modal>
          )}

          {showModal && gameMode !== 'twoPlayer' && (
            <Modal>
              <h2>{modalMessage}</h2>
              <p>시도 횟수: {moves}회</p>
              <p>
                {gameMode === 'timeAttack'
                  ? `남은 시간: ${formatTime(timer, true)}`
                  : `소요 시간: ${formatTime(timer, true)}`
                }
              </p>
              <button onClick={() => navigate('/mode')}>
                난이도 선택으로 돌아가기
              </button>
            </Modal>
          )}
        </>
      )}
    </GameContainer>
  );
};

export default Game;