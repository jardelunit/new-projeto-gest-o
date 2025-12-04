// # Contexto: KPIs de despesas.
// # Responsabilidades: mostrar total filtrado, média e maior gasto.

import React from 'react';
import { DollarSign, PieChart } from 'lucide-react';
import { KPICard } from '../../../../components/ui/Common';
import { formatCurrency } from '../utils/formatters';

type ExpensesKPIsProps = {
  totalExpenses: number;
  averageExpense: number;
  maxExpense: number;
};

const ExpensesKPIs: React.FC<ExpensesKPIsProps> = ({ totalExpenses, averageExpense, maxExpense }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <KPICard
      title="Total Filtrado"
      value={formatCurrency(totalExpenses)}
      icon={<DollarSign />}
    />
    <KPICard
      title="Média por Despesa"
      value={formatCurrency(averageExpense)}
      icon={<PieChart />}
    />
    <KPICard
      title="Maior Gasto do Período"
      value={formatCurrency(maxExpense)}
      icon={<DollarSign />}
    />
  </div>
);

export default ExpensesKPIs;
