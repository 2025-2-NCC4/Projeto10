// /src/components/DashboardContainer.jsx
import React from 'react';
import Card from './Card'; // Importe o novo componente Card
import './DashboardContainer.css';

function DashboardContainer() {
  return (
    <div className="dashboard-container">
      <Card title="Receita Total">
        <p>R$ 1.250.340,00</p>
      </Card>
      <Card title="Custo com Cupons">
        <p>R$ 80.120,00</p>
      </Card>
      <Card title="Ticket Médio">
        <p>R$ 89,50</p>
      </Card>
      <Card title="Novos Usuários">
        <p>+350 este mês</p>
      </Card>
    </div>
  );
}

export default DashboardContainer;