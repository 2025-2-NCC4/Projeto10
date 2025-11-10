// Em src/components/DataTable.jsx

import React from 'react';
import styles from './DataTable.module.css';

function DataTable({ title, data }) {
  
  // *** NOSSO TESTE DE DEPURACÃO (FILHO) ***
  console.log('DataTable (FILHO) recebeu:', data);

  // Se não houver dados, não renderize nada
  if (!data || data.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <h2>{title}</h2>
        <p>Sem dados para exibir.</p>
      </div>
    );
  }

  // Pega o primeiro item dos dados para descobrir as colunas
  const headers = Object.keys(data[0]);

  return (
    <div className={styles.tableContainer}>
      <h2>{title}</h2>
      <table className={styles.table}>
        {/* Cabeçalho da Tabela */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        {/* Corpo da Tabela */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;