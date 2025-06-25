// 홈 스크린 컴포넌트: 게임 설정과 시작 화면을 담당

// 난이도 설정
const DIFFICULTY = {
  easy: { size: 4, time: 60, label: 'Easy (4x4)' },     // 초급 난이도
  normal: { size: 6, time: 120, label: 'Normal (6x6)' }, // 중급 난이도
  hard: { size: 8, time: 180, label: 'Hard (8x8)' }     // 고급 난이도
};

// 기본 아바타 이미지 배열
const DEFAULT_AVATARS = [
  // ...existing code...
];

const HomeScreen = ({ onStartGame, onImageUpload, userImage, difficulty, setDifficulty }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* 왼쪽: 게임 소개 */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              팬모리
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              최애 얼굴, 몇 초면 외우죠?
            </p>
            <p className="text-base md:text-lg opacity-75">
              지금 바로 시작해보세요!
            </p>
          </div>

          {/* 게임 설정 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 space-y-4">
            {/* 난이도 선택 */}
            <div>
              <label className="block text-sm font-medium mb-2">난이도</label>
              <select 
                // ...existing code...
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {/* ...existing code... */}
              </select>
            </div>

            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                최애 사진 업로드
              </label>
              <div className="relative">
                <input
                  // ...existing code...
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center w-full px-3 md:px-4 py-2 md:py-3 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/50 transition-colors text-sm md:text-base"
                >
                  <Upload className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {userImage ? '사진 변경하기' : '사진 선택하기'}
                </label>
              </div>
              {userImage && (
                <div className="mt-3 flex items-center space-x-2">
                  <img src={userImage} alt="Preview" className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
                  <span className="text-xs md:text-sm">사진이 선택되었습니다</span>
                </div>
              )}
            </div>

            <button
              onClick={onStartGame}
              disabled={!userImage}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              게임 시작
            </button>
          </div>
        </div>

        {/* 오른쪽: 게임 프리뷰 */}
        <div className="hidden md:flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-sm">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="relative">
                  <div className="aspect-square bg-white/20 rounded-lg border-2 border-white/30 flex items-center justify-center">
                    {i === 3 && userImage ? (
                      <img src={userImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : i === 3 ? (
                      <div className="w-full h-full bg-gray-400 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    ) : (
                      <div className="text-white/70 text-xs">
                        메모리 카드
                      </div>
                    )}
                  </div>
                  {i === 3 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      Start
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;