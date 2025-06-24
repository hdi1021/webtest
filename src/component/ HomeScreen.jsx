import { Upload, User } from 'lucide-react';

const DIFFICULTY = {
  easy: { size: 4, time: 60, label: 'Easy (4x4)' },
  normal: { size: 6, time: 120, label: 'Normal (6x6)' },
  hard: { size: 8, time: 180, label: 'Hard (8x8)' }
};

// 기본 아바타 이미지들
const DEFAULT_AVATARS = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGRjZCNkIiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIxNSIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMjUgODBDMjUgNjcuODUgMzYuMTkgNTggNTAgNThTNzUgNjcuODUgNzUgODBIMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0Q0FGNTAILZ48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIxNSIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMjUgODBDMjUgNjcuODUgMzYuMTkgNTggNTAgNThTNzUgNjcuODUgNzUgODBIMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM5QzI3QjAiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIxNSIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMjUgODBDMjUgNjcuODUgMzYuMTkgNTggNTAgNThTNzUgNjcuODUgNzUgODBIMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
];

// 홈 화면 컴포넌트
const HomeScreen = ({ onStartGame, onImageUpload, userImage, difficulty, setDifficulty }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* 왼쪽: 게임 소개 */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              팬모리
            </h1>
            <p className="text-xl opacity-90">
              최애 얼굴, 몇 초면 외우죠?
            </p>
            <p className="text-lg opacity-75">
              지금 바로 시작해보세요!
            </p>
          </div>

          {/* 게임 설정 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">게임 설정</h3>
            
            {/* 난이도 선택 */}
            <div>
              <label className="block text-sm font-medium mb-2">난이도</label>
              <select 
                value={Object.keys(DIFFICULTY).find(key => DIFFICULTY[key] === difficulty)}
                onChange={(e) => setDifficulty(DIFFICULTY[e.target.value])}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {Object.entries(DIFFICULTY).map(([key, diff]) => (
                  <option key={key} value={key} className="text-gray-800">
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                최애 사진 업로드
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/50 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {userImage ? '사진 변경하기' : '사진 선택하기'}
                </label>
              </div>
              {userImage && (
                <div className="mt-3 flex items-center space-x-2">
                  <img src={userImage} alt="Preview" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm">사진이 선택되었습니다</span>
                </div>
              )}
            </div>

            <button
              onClick={onStartGame}
              disabled={!userImage}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              게임 시작
            </button>
          </div>
        </div>

        {/* 오른쪽: 게임 프리뷰 */}
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {/* 미리보기 카드들 */}
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="relative">
                  <div className="aspect-square bg-white/20 rounded-lg border-2 border-white/30 flex items-center justify-center">
                    {i === 3 && userImage ? (
                      <img src={userImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : i === 3 ? (
                      <div className="w-full h-full bg-gray-400 rounded-lg flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <div className="text-white/70 text-xs text-center">
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