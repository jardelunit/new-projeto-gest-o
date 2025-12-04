// # Contexto: gráfico de despesas por categoria.
// # Responsabilidades: renderizar pie chart com distribuição das categorias filtradas.

import React from 'react';
import { ExpensesPieChart } from '../../../../components/charts/DashboardCharts';

type ChartDatum = { name: string; value: number };

type ExpensesChartProps = {
  data: ChartDatum[];
};

const ExpensesChart: React.FC<ExpensesChartProps> = ({ data }) => (
  <div className="lg:col-span-1">
    <ExpensesPieChart data={data} />
  </div>
);

export default ExpensesChart;
