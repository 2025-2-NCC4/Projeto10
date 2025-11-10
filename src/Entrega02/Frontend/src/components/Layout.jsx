// Em src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // 1. Importe a Sidebar
import styles from './Layout.module.css'; // 2. Importe o CSS do Layout

function Layout() {
  return (
    // 3. Aplique o container do grid
    <div className={styles.layoutContainer}>

      {/* 4. Coloque os componentes (as classes vêm do CSS Module) */}
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* 5. O Outlet (seu conteúdo) fica na área principal */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;