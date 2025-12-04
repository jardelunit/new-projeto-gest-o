// # Contexto: cabeçalho da página de despesas.
// # Responsabilidades: apresentar título e disparar criação de nova despesa.

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../../components/ui/Common';

type ExpensesHeaderProps = {
  onAddExpense: () => void;
};

const ExpensesHeader: React.FC<ExpensesHeaderProps> = ({ onAddExpense }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>
      <h1 className="text-2xl font-bold text-white">Gestão de Despesas</h1>
      <p className="text-slate-400">Controle detalhado de custos variáveis, fixos e fiscais.</p>
    </div>
    <Button variant="danger" onClick={onAddExpense}>
      <Plus size={18} className="mr-2" />
      Lançar Despesa
    </Button>
  </div>
);

export default ExpensesHeader;
