// Em src/pages/Sobre.jsx
import React from 'react';

// 1. Importe o NOVO arquivo CSS
import styles from './Sobre.module.css'; 

// 2. IMPORTE O SEU LOGO da pasta assets
import evewLogo from '../assets/Evew_logo.png';

function Sobre() {
  return (
    // 3. Use a nova classe principal
    <div className={styles.sobreContainer}>
      
      {/* 4. ADICIONE A IMAGEM AQUI */}
      <img 
        src={evewLogo} 
        alt="Logo EasyView (EVEW)" 
        className={styles.logo} 
      />

      <h1>Sobre a EVEW</h1>
      
      <p className={styles.intro}>
        A *EVEW* é uma empresa fictícia especializada em Business Intelligence e Análise de Dados, focada em transformar dados em insights acionáveis.
      </p>
      <p>
        Este dashboard é um projeto de demonstração desenvolvido para a **PicMoney**, 
        com o objetivo de analisar e visualizar dados de múltiplas fontes (Players, Cupons, Lojas e Tráfego de Pedestres)
        para impulsionar a tomada de decisão estratégica.
      </p>
      <h3>Criado por:</h3>
      <ul>
        <li>Felipe Vallim Soares</li>
        <li>Pedro Della Rosa Antonio</li>
        <li>João Victor Rezende</li>
        <li>Arthur Paltrinieri</li>
      </ul>
      <h3>Tecnologias Utilizadas:</h3>
      <ul>
        <li>**Backend:** Node.js, Express, CSV-Parser, Iconv-Lite</li>
        <li>**Frontend:** React, Vite, React Router, Recharts, React Icons</li>
      </ul>
    </div>
  );
}

export default Sobre;