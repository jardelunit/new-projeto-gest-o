
import React from 'react';
import { DataTable, Button, Card } from '../../components/ui/Common';
import { mockInvoices } from '../../mocks/index';
import { Download, TrendingUp, AlertTriangle } from 'lucide-react';
import { Invoice } from '../../types';

const Financial: React.FC = () => {
  const columns = [
    { header: 'Transportadora', accessor: 'carrierName' as keyof Invoice, className: 'font-medium text-white' },
    { 
        header: 'Valor', 
        accessor: (row: Invoice) => <span className="font-medium text-slate-200">R$ {row.amount.toFixed(2)}</span> 
    },
    { header: 'Vencimento', accessor: 'dueDate' as keyof Invoice },
    { 
        header: 'Status', 
        accessor: (row: Invoice) => {
            const colors = {
                'Pago': 'bg-emerald-500/20 text-emerald-400',
                'Pendente': 'bg-yellow-500/20 text-yellow-400',
                'Atrasado': 'bg-red-500/20 text-red-400'
            };
            return <span className={`px-2 py-1 rounded text-xs font-bold ${colors[row.status]}`}>{row.status}</span>;
        }
    },
    { 
        header: '', 
        accessor: () => <Button variant="ghost" className="text-xs">Baixar PDF</Button>
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Faturamento</h1>
          <p className="text-slate-400">Controle de faturas e pagamentos de assinaturas.</p>
        </div>
        <Button variant="secondary">
            <Download size={18} className="mr-2" /> Relatório Financeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-6 border-l-4 border-l-emerald-500">
            <div className="bg-emerald-500/20 p-3 rounded-lg mr-4"><TrendingUp className="text-emerald-500" /></div>
            <div>
                <p className="text-slate-400 text-sm">Receita Confirmada</p>
                <h3 className="text-2xl font-bold text-white">R$ 125.000</h3>
            </div>
        </Card>
        <Card className="flex items-center p-6 border-l-4 border-l-yellow-500">
            <div className="bg-yellow-500/20 p-3 rounded-lg mr-4"><AlertTriangle className="text-yellow-500" /></div>
            <div>
                <p className="text-slate-400 text-sm">Pendente</p>
                <h3 className="text-2xl font-bold text-white">R$ 12.450</h3>
            </div>
        </Card>
        <Card className="flex items-center p-6 border-l-4 border-l-red-500">
            <div className="bg-red-500/20 p-3 rounded-lg mr-4"><AlertTriangle className="text-red-500" /></div>
            <div>
                <p className="text-slate-400 text-sm">Em Atraso</p>
                <h3 className="text-2xl font-bold text-white">R$ 3.200</h3>
            </div>
        </Card>
      </div>

      <h2 className="text-lg font-semibold text-white mt-4">Faturas Recentes</h2>
      <DataTable 
        data={mockInvoices}
        columns={columns}
        keyField="id"
      />
    </div>
  );
};

export default Financial;
