// # Contexto: aba de contas a pagar.
// # Responsabilidades: listar despesas com vencimento, status e ações.

import React from 'react';
import { Filter } from 'lucide-react';
import { Button, DataTable, Input } from '../../../../components/ui/Common';
import { Payable } from '../services/financialService';
import { formatCurrency, getPayableStatusClass } from '../utils/formatters';

type PayablesTabProps = {
  payables: Payable[];
};

const PayablesTab: React.FC<PayablesTabProps> = ({ payables }) => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Filter size={16} /> Filtros:
      </div>
      <Input type="date" className="md:w-40" />
      <Input type="date" className="md:w-40" />
      <Button variant="danger" className="ml-auto" type="button">
        + Lançar Conta
      </Button>
    </div>

    <DataTable
      data={payables}
      columns={[
        { header: 'Fornecedor / Descrição', accessor: 'supplier' as any, className: 'font-medium text-white' },
        { header: 'Vencimento', accessor: 'dueDate' as any },
        { header: 'Categoria', accessor: 'category' as any },
        {
          header: 'Valor',
          accessor: (row: Payable) => <span className="text-red-400 font-medium">{formatCurrency(row.amount)}</span>,
        },
        {
          header: 'Status',
          accessor: (row: Payable) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPayableStatusClass(row.status)}`}>
              {row.status}
            </span>
          ),
        },
        {
          header: '',
          accessor: () => (
            <Button variant="ghost" className="text-xs" type="button">
              Baixar
            </Button>
          ),
        },
      ]}
      keyField="id"
    />
  </div>
);

export default PayablesTab;
