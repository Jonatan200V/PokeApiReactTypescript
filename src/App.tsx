import { AppContextStore } from './hooks/useAppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/main.css';
import Home from './pages/Home';
import Puzzle from './pages/Puzzle';
import PuzzleMemory from './pages/PuzzleMemory';
function App() {
  return (
    <AppContextStore>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/puzzle-guess' element={<Puzzle />} />
          <Route path='/puzzle-memory' element={<PuzzleMemory />} />
        </Routes>
      </BrowserRouter>
    </AppContextStore>
  );
}

export default App;
