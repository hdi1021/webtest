import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EasyImage from '../assets/Home/easy.png';
import NomalImage from '../assets/Home/nomal.png';
import HardImage from '../assets/Home/hard.png';

// 게임 모드 선택 컴포넌트: 난이도 선택 화면 구성

// 컨테이너 스타일: 화면 전체를 감싸고 중앙 정렬하는 레이아웃
const ModeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #f4f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;  // 자식 요소들 간 세로 간격
  padding: 2rem;
`;

// 제목 스타일: 크기, 색상, 반응형 적용
const Title = styled.h1`
  font-size: 2.5rem;
  color: #4E4E4E;

  // 모바일 화면 대응: 폰트 크기 줄이고 텍스트 가운데 정렬
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

// 모드 카드들을 감싸는 컨테이너: 가로 정렬 및 간격 조절, 반응형 대응
const ModesWrapper = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;  // 모바일에서는 세로 정렬
    align-items: center;
    gap: 1.5rem;
  }
`;

// 각 난이도 모드를 나타내는 카드 스타일
const ModeCard = styled(Link)`
  width: 250px;
  min-height: 340px;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  text-decoration: none;  // 링크 기본 밑줄 제거
  text-align: center;
  box-shadow: 0 10px 20px rgba(132, 164, 245, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 카드에 마우스 올렸을 때 살짝 떠오르는 효과와 그림자 진해짐
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(132, 164, 245, 0.2);
  }

  // 태블릿 화면에서 카드 크기와 패딩 조절
  @media (max-width: 1024px) {
    width: 220px;
    min-height: 320px;
    padding: 1.5rem;
  }

  // 모바일 화면에서 크기와 패딩 재조정
  @media (max-width: 768px) {
    width: 280px;
    min-height: 300px;
    padding: 2rem;
  }
`;

// 카드 내 난이도 제목 스타일
const ModeTitle = styled.h2`
  font-size: 2.5rem;
  color: #84A4F5;
  margin-top: 1rem;
  margin-bottom: 1rem;

  // 모바일 화면에서 글자 크기 줄임
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// 카드 내 난이도에 대한 간단한 설명 텍스트 스타일
const ModeDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

// 카드 내 세부사항 텍스트 (예: 난이도 스펙)
const ModeSpec = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

// 난이도 카드에 표시할 이미지 스타일
const ModeImage = styled.img`
  width: 80%;
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin-top: auto;  // 카드 하단에 붙도록 밀어내기
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 70%;
    margin-top: 1rem;
  }
`;

// 카드 내 제목과 설명을 감싸는 래퍼 (아래쪽 여백 조절용)
const ModeTitleWrapper = styled.div`
  margin-bottom: auto;
`;

// 실제 게임 난이도 선택 컴포넌트
const GameMode = () => {
  return (
    <ModeContainer>
      <Title>게임 난이도 선택</Title>

      <ModesWrapper>
        {/* Easy 난이도 카드 */}
        <ModeCard to="/image-upload?mode=easy">
          <ModeTitleWrapper>
            <ModeTitle>Easy</ModeTitle>
            <ModeDescription>처음이신가요?</ModeDescription>
            <ModeSpec>4 x 4 • 60초</ModeSpec>
          </ModeTitleWrapper>
          <ModeImage src={EasyImage} alt="Easy Mode" />
        </ModeCard>
        
        {/* Normal 난이도 카드 */}
        <ModeCard to="/image-upload?mode=normal">
          <ModeTitleWrapper>
            <ModeTitle>Normal</ModeTitle>
            <ModeDescription>도전해보세요!</ModeDescription>
            <ModeSpec>6 x 6 • 90초</ModeSpec>
          </ModeTitleWrapper>
          <ModeImage src={NomalImage} alt="Normal Mode" />
        </ModeCard>
        
        {/* Hard 난이도 카드 */}
        <ModeCard to="/image-upload?mode=hard">
          <ModeTitleWrapper>
            <ModeTitle>Hard</ModeTitle>
            <ModeDescription>진정한 고수라면?</ModeDescription>
            <ModeSpec>8 x 8 • 120초</ModeSpec>
          </ModeTitleWrapper>
          <ModeImage src={HardImage} alt="Hard Mode" />
        </ModeCard>
      </ModesWrapper>
    </ModeContainer>
  );
};

export default GameMode;