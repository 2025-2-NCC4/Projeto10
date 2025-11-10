// Em src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PaginaCEO from './pages/PaginaCEO';
import PaginaCTO from './pages/PaginaCTO';
import Sobre from './pages/Sobre'; // 1. IMPORTE A NOVA PÁGINA
import './App.css';

function App() {
  return (
    <Routes>
      {/* A rota "pai" continua usando o Layout */}
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Dashboard />} />
        <Route path="ceo" element={<PaginaCEO />} />
        <Route path="cto" element={<PaginaCTO />} />
        
        {/* 2. ADICIONE A ROTA PARA "SOBRE NÓS" */}
        <Route path="sobre" element={<Sobre />} />
        
      </Route>
    </Routes>
  );
}

export default App;