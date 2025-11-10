// Em src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // 1. Use nosso hook
import styles from './ThemeToggle.module.css';

// 2. IMPORTE OS ÍCONES (do set 'Bootstrap Icons' - bs)
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {/* 3. SUBSTITUA OS EMOJIS PELOS COMPONENTES DE ÍCONE */}
      {theme === 'light' ? (
        <BsSunFill className={`${styles.icon} ${styles.sun}`} />
      ) : (
        <BsMoonFill className={`${styles.icon} ${styles.moon}`} />
      )}
    </button>
  );
}

export default ThemeToggle;