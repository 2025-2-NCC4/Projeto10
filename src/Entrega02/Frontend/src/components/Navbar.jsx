// Em src/components/Navbar.jsx
import React from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom'; // 1. Importamos o 'useLocation'

// 2. Criamos um "mapa" de rotas para títulos
const getTitleFromPath = (path) => {
  switch (path) {
    case '/':
      return 'Visão Geral';
    case '/ceo':
      return 'Visão CEO';
    case '/cto':
      return 'Visão CTO';
    case '/sobre':
      return 'Sobre Nós'; // 3. O título agora vai mudar
    default:
      return 'EasyView'; // Um título padrão
  }
};

function Navbar() {
  const location = useLocation(); // 4. Pegamos a localização atual
  const title = getTitleFromPath(location.pathname); // 5. Obtemos o título dinâmico

  return (
    <nav className={styles.navbar}>
      
      {/* 6. Usamos o título dinâmico */}
      <h1>{title}</h1>
      
      <div className={styles.navControls}>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;