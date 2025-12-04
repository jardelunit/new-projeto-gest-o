// # Contexto: tabela de despesas filtradas.
// # Responsabilidades: exibir descrição, categoria com cor, data e valor formatado.

import React, { useMemo } from 'react';
import { DataTable } from '../../../../components/ui/Common';
import { Expense } from '../../../../types';
import { formatExpenseValue } from '../utils/formatters';

const categoryColors: Record<string, string> = {
  Variável: 'bg-blue-500/20 text-blue-400',
  Fixa: 'bg-purple-500/20 text-purple-400',
  Imposto: 'bg-red-500/20 text-red-400',
  Financiamento: 'bg-yellow-500/20 text-yellow-400',
  Seguro: 'bg-emerald-500/20 text-emerald-400'
};

type ExpensesTableProps = {
  data: Expense[];
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ data }) => {
  const columns = useMemo(
    () => [
      { header: 'Descrição', accessor: 'description' as keyof Expense, className: 'font-medium text-white' },
      {
        header: 'Categoria',
        accessor: (row: Expense) => (
          <span className={`px-2 py-1 rounded text-xs font-bold ${categoryColors[row.category] || 'bg-slate-700 text-slate-300'}`}>
            {row.category}
          </span>
        )
      },
      { header: 'Data', accessor: 'date' as keyof Expense },
      {
        header: 'Valor',
        accessor: (row: Expense) => (
          <span className="text-red-400 font-bold">{formatExpenseValue(row.amount)}</span>
        )
      }
    ],
    []
  );

  return <DataTable data={data} columns={columns} keyField="id" />;
};

export default ExpensesTable;
