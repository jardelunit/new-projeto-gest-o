// # Contexto: bloco de ações rápidas na visão geral.
// # Responsabilidades: exibir botões de atalho para criar frete, veículo ou despesa.

import React from 'react';
import { Button } from '../../../../components/ui/Common';

const QuickActions: React.FC = () => (
  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
    <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
    <div className="space-y-3">
      <Button className="w-full justify-start" variant="secondary" type="button">
        + Novo Frete
      </Button>
      <Button className="w-full justify-start" variant="secondary" type="button">
        + Registrar Veículo
      </Button>
      <Button className="w-full justify-start" variant="secondary" type="button">
        + Adicionar Despesa
      </Button>
    </div>
  </div>
);

export default QuickActions;
