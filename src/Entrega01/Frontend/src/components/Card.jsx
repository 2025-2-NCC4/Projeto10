// Em src/components/Card.jsx
import React from 'react';
// ATUALIZADO: Importando o novo nome do arquivo CSS
import styles from './Card.module.css'; 

function Card({ title, content }) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{content}</p>
    </article>
  );
}

export default Card;