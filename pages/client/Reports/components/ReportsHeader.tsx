// # Contexto: cabeçalho da central de relatórios.
// # Responsabilidades: exibir título e descrição introdutória.

import React from 'react';

const ReportsHeader: React.FC = () => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>
      <h1 className="text-2xl font-bold text-white">Central de Relatórios</h1>
      <p className="text-slate-400">Gere, visualize e exporte dados detalhados da sua operação.</p>
    </div>
  </div>
);

export default ReportsHeader;
