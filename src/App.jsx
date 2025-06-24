// src/App.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameBoard from './component/GameBoard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home';
import GameMode from './component/GameMode';
import ImageUpload from './component/ImageUpload';
import Game from './component/Game';
import GameModeSelect from './component/GameModeSelect';  // 임포트 추가

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const DIFFICULTY = {
  easy: { size: 4, time: 60 },
  normal: { size: 6, time: 120 },
  hard: { size: 8, time: 180 }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mode" element={<GameMode />} />
        <Route path="/image-upload" element={<ImageUpload />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-mode-select" element={<GameModeSelect />} />
      </Routes>
    </Router>
  );
}

export default App;