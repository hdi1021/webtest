import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import { defaultCards } from '../assets/defaultCards';  // import 구문 수정

const GameContainer = styled.div`
  min-height: 100vh;
  background: ${props => 
    props.gameMode === 'twoPlayer' 
    ? 'linear-gradient(90deg, rgba(132, 164, 245, 0.1) 50%, rgba(245, 132, 132, 0.1) 50%)'
    : 'linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%)'
  };
  padding: 2rem;
`;

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

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty, gameMode, userImages } = location.state || {};

  const difficultyConfig = getDifficultyConfig(difficulty);

  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(gameMode === 'timeAttack' ? difficultyConfig.time : 0);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [matchedPairsPlayer1, setMatchedPairsPlayer1] = useState([]);
  const [matchedPairsPlayer2, setMatchedPairsPlayer2] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [gameReady, setGameReady] = useState(false);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 또는 2
  const [playerScores, setPlayerScores] = useState({ 1: 0, 2: 0 });

  const initializeGame = () => {
    const totalPairs = difficultyConfig.pairs;
    let allImages = [];

    // 1. 사용자 이미지와 기본 이미지를 모두 수집
    if (userImages && userImages.length > 0) {
      // 사용자 이미지를 복사하고 섞기
      allImages = [...userImages];
    }

    // 2. 기본 이미지 셔플
    const shuffledDefaultImages = [...defaultCards]
      .sort(() => Math.random() - 0.5)
      .map(card => card.image);
    allImages = [...allImages, ...shuffledDefaultImages];

    // 3. 모든 이미지를 섞고 필요한 만큼만 선택
    const selectedImages = allImages
      .sort(() => Math.random() - 0.5)
      .slice(0, totalPairs);

    // 4. 선택된 이미지로 페어 만들기
    const gamePairs = selectedImages.flatMap(image => [image, image]);

    // 5. 최종 카드 배열 다시 섞기
    const shuffledCards = gamePairs
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
        let message;
        if (gameMode === 'timeAttack') {
          if (timer > 0) {
            message = `축하합니다! 클리어하셨습니다!`;
          } else {
            message = '아쉽게도 시간이 초과되었습니다!';
          }
        } else {
          message = `축하합니다! 클리어하셨습니다!`;
        }
        setModalMessage(message);
      }
    }
    // eslint-disable-next-line
  }, [matchedPairs, matchedPairsPlayer1, matchedPairsPlayer2, timer, gameMode, difficultyConfig]);

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