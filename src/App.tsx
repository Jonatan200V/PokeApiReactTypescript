import { AppContextStore } from './hooks/useAppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/main.css';
import Home from './pages/Home';
function App() {
  return (
    <AppContextStore>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContextStore>
  );
}

export default App;
