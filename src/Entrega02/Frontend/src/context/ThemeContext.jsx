// Em src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Contexto
const ThemeContext = createContext();

// 2. Cria o "Provedor"
export const ThemeProvider = ({ children }) => {
  // Tenta ler o tema salvo no localStorage, ou usa 'light' como padrão
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Efeito que roda toda vez que o 'theme' muda
  useEffect(() => {
    // 1. Salva a nova escolha no localStorage
    localStorage.setItem('theme', theme);
    
    // 2. Adiciona ou remove a classe 'dark' do <body> do HTML
    // (É assim que o CSS vai funcionar)
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]); // Roda sempre que 'theme' mudar

  // Função para trocar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. Fornece o 'theme' e a função 'toggleTheme' para todos os filhos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Cria um "Hook" customizado para facilitar o uso
// (Assim, em vez de importar 'useContext' e 'ThemeContext' em todo lugar,
//  só importamos 'useTheme')
export const useTheme = () => {
  return useContext(ThemeContext);
};