// # Contexto: gestão central de documentos da frota.
// # Responsabilidades: listar documentos com validade, status visual e ações básicas.

import React from 'react';
import { FileText, Upload, Download } from 'lucide-react';
import { Button, Card, DataTable } from '../../../../components/ui/Common';
import { Document } from '../../../../types';
import { formatDate } from '../utils/formatters';

type GlobalDocumentsManagerProps = {
  documents: Document[];
};

const GlobalDocumentsManager: React.FC<GlobalDocumentsManagerProps> = ({ documents }) => {
  const columns = [
    { header: 'Documento', accessor: 'title' as keyof Document, className: 'font-medium text-white' },
    { header: 'Entidade', accessor: (row: Document) => <span className="font-mono">{row.entityId}</span> },
    {
      header: 'Validade',
      accessor: (row: Document) => {
        const isExpired = row.status === 'Vencido';
        const isNear = row.status === 'A Vencer';
        const width = isExpired ? '100%' : isNear ? '90%' : '40%';
        const color = isExpired ? 'bg-red-500' : isNear ? 'bg-yellow-500' : 'bg-emerald-500';

        return (
          <div className="w-32">
            <div className="flex justify-between text-xs mb-1">
              <span>{formatDate(row.expiryDate)}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${color}`} style={{ width }}></div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessor: (row: Document) => {
        const color = row.status === 'Vencido' ? 'text-red-400' : row.status === 'A Vencer' ? 'text-yellow-400' : 'text-emerald-400';
        return <span className={`font-bold text-xs ${color}`}>{row.status.toUpperCase()}</span>;
      },
    },
    {
      header: 'Ações',
      accessor: () => (
        <div className="flex gap-2">
          <Button variant="ghost" className="p-1 h-8 w-8 text-slate-400 hover:text-white" title="Download">
            <Download size={16} />
          </Button>
          <Button variant="ghost" className="p-1 h-8 w-8 text-slate-400 hover:text-white" title="Renovar">
            <Upload size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-slate-900/70 backdrop-blur p-4 rounded-lg border border-slate-700/70 shadow-lg shadow-slate-900/40">
        <div>
          <h2 className="font-bold text-white">Controle de Documentação</h2>
          <p className="text-slate-400 text-sm">Gerencie vencimentos de IPVA, Licenciamento, Seguros e ANTT.</p>
        </div>
        <Button>
          <FileText size={18} className="mr-2" /> Novo Documento
        </Button>
      </div>
      <DataTable data={documents} columns={columns} keyField="id" />
    </div>
  );
};

export default GlobalDocumentsManager;
