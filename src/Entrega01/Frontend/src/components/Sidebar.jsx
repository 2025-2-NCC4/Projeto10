// Em src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import evewLogo from '../assets/Evew_logo.png'; // 1. IMPORTE O LOGO

function Sidebar() {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
  };

  return (
    <aside className={styles.sidebar}>
      {/* 2. SUBSTITUÍMOS O <h2> POR UMA IMAGEM */}
      <img src={evewLogo} alt="EasyView Logo" className={styles.sidebarLogo} />
      
      <p className={styles.clientName}>Análise para PicMoney</p>
      
      <ul className={styles.sidebarList}>
        <li>
          <NavLink to="/" className={getNavLinkClass} end>
            Visão Geral
          </NavLink>
        </li>
        <li>
          <NavLink to="/ceo" className={getNavLinkClass}>
            Visão CEO
          </NavLink>
        </li>
        <li>
          <NavLink to="/cto" className={getNavLinkClass}>
            Visão CTO
          </NavLink>
        </li>
        <li>
          <NavLink to="/sobre" className={getNavLinkClass}>
            Sobre Nós
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;