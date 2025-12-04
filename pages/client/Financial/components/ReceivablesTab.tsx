// # Contexto: aba de contas a receber.
// # Responsabilidades: listar fretes a receber com status de pagamento.

import React from 'react';
import { Filter } from 'lucide-react';
import { Button, DataTable, Input } from '../../../../components/ui/Common';
import { Receivable } from '../services/financialService';
import { formatCurrency, getReceivableStatusClass } from '../utils/formatters';

type ReceivablesTabProps = {
  receivables: Receivable[];
};

const ReceivablesTab: React.FC<ReceivablesTabProps> = ({ receivables }) => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Filter size={16} /> Filtros:
      </div>
      <Input placeholder="Buscar cliente..." />
      <Button variant="success" className="ml-auto" type="button">
        + Lançar Recebimento
      </Button>
    </div>

    <DataTable
      data={receivables}
      columns={[
        { header: 'Frete / Origem', accessor: 'origin' as any, className: 'font-medium text-white' },
        { header: 'Destino', accessor: 'destination' as any },
        { header: 'Previsão', accessor: 'dueDate' as any },
        {
          header: 'Valor',
          accessor: (row: Receivable) => (
            <span className="text-emerald-400 font-medium">{formatCurrency(row.value)}</span>
          ),
        },
        {
          header: 'Status',
          accessor: (row: Receivable) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getReceivableStatusClass(row.paymentStatus)}`}>
              {row.paymentStatus}
            </span>
          ),
        },
        {
          header: 'Ações',
          accessor: () => (
            <Button variant="ghost" className="text-xs" type="button">
              Detalhes
            </Button>
          ),
        },
      ]}
      keyField="id"
    />
  </div>
);

export default ReceivablesTab;
