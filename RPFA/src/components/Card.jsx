// /src/components/Card.jsx
import React from 'react';
import './Card.css'; // Vamos criar este CSS a seguir

function Card(props) {
  return (
    <div className="dashboard-card">
      <h3 className="card-title">{props.title}</h3>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
}

export default Card;