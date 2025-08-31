// /src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css'; // Vamos criar este arquivo a seguir

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>PicMoney</h2>
      <ul>
        <li>Dashboard CEO</li>
        <li>Dashboard CFO</li>
        <li>Dashboard CTO</li>
      </ul>
    </div>
  );
}

export default Sidebar;