
import React from 'react';
import { DataTable, Button, Input } from '../../components/ui/Common';
import { mockWebhooks } from '../../mocks/index';
import { Plus, Webhook as WebhookIcon, RefreshCw } from 'lucide-react';
import { Webhook } from '../../types';

const Webhooks: React.FC = () => {
  const columns = [
    { header: 'URL de Destino', accessor: 'url' as keyof Webhook, className: 'font-mono text-xs text-slate-300 break-all' },
    { 
        header: 'Evento', 
        accessor: (row: Webhook) => <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-200 font-mono">{row.event}</span>
    },
    { 
        header: 'Status', 
        accessor: (row: Webhook) => (
            <span className={`flex items-center text-sm ${row.status === 'Ativo' ? 'text-emerald-400' : 'text-red-400'}`}>
                {row.status === 'Ativo' ? <CheckCircleIcon /> : <XCircleIcon />}
                <span className="ml-1">{row.status}</span>
            </span>
        ) 
    },
    { header: 'Último Disparo', accessor: 'lastTriggered' as keyof Webhook },
    {
        header: 'Ações',
        accessor: () => (
            <Button variant="ghost" className="p-1 h-8 w-8"><RefreshCw size={14} /></Button>
        )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
             Webhooks
          </h1>
          <p className="text-slate-400">Configure notificações automáticas para sistemas externos.</p>
        </div>
        <Button>
            <Plus size={18} className="mr-2" />
            Adicionar Webhook
        </Button>
      </div>

      <DataTable 
        data={mockWebhooks}
        columns={columns}
        keyField="id"
      />
    </div>
  );
};

const CheckCircleIcon = () => <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>;
const XCircleIcon = () => <div className="w-2 h-2 bg-red-500 rounded-full"></div>;

export default Webhooks;
