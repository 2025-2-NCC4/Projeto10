// /src/components/Navbar.jsx
import React from 'react';
import './Navbar.css'; // Vamos criar este arquivo a seguir

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Visão Financeira (CFO)</h1>
      <div className="user-profile">
        <span>Usuário</span>
      </div>
    </nav>
  );
}

export default Navbar;