
import React from 'react';
import { DataTable, Button, Input } from '../../components/ui/Common';
import { mockCarriers } from '../../mocks/index';
import { Search, Filter, Plus } from 'lucide-react';
import { Carrier } from '../../types';

const Carriers: React.FC = () => {
  const columns = [
    { header: 'Empresa', accessor: 'name' as keyof Carrier, className: 'font-medium text-white' },
    { header: 'CNPJ', accessor: 'cnpj' as keyof Carrier },
    { 
      header: 'Plano', 
      accessor: (row: Carrier) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          row.plan === 'Empresarial' ? 'bg-purple-500/20 text-purple-400' :
          row.plan === 'Profissional' ? 'bg-blue-500/20 text-blue-400' :
          'bg-slate-500/20 text-slate-400'
        }`}>
          {row.plan}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: (row: Carrier) => (
        <span className={`flex items-center ${row.status === 'Ativo' ? 'text-emerald-400' : 'text-red-400'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${row.status === 'Ativo' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
          {row.status}
        </span>
      )
    },
    { 
        header: 'Ações', 
        accessor: () => (
            <div className="flex gap-2">
                <Button variant="ghost" className="px-2 py-1 text-xs">Editar</Button>
                <Button variant="ghost" className="px-2 py-1 text-xs text-red-400 hover:text-red-300">Bloquear</Button>
            </div>
        )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transportadoras</h1>
          <p className="text-slate-400">Gerencie as empresas cadastradas na plataforma.</p>
        </div>
        <Button>
            <Plus size={18} className="mr-2" />
            Nova Transportadora
        </Button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Buscar por nome ou CNPJ..." className="pl-10" />
        </div>
        <Button variant="secondary"><Filter size={16} className="mr-2"/> Filtrar</Button>
      </div>

      <DataTable 
        data={mockCarriers}
        columns={columns}
        keyField="id"
      />
    </div>
  );
};

export default Carriers;
