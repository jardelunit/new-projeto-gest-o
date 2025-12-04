
import React from 'react';
import { DataTable, Button, Input } from '../../components/ui/Common';
import { mockUsers } from '../../mocks/index';
import { Search, Plus } from 'lucide-react';
import { User } from '../../types';

const Users: React.FC = () => {
  const columns = [
    { 
        header: 'Nome', 
        accessor: (row: User) => (
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-3 text-xs font-bold">
                    {row.name.charAt(0)}
                </div>
                <span className="font-medium text-white">{row.name}</span>
            </div>
        ) 
    },
    { header: 'Email', accessor: 'email' as keyof User },
    { 
        header: 'Função', 
        accessor: (row: User) => (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${row.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {row.role}
            </span>
        ) 
    },
    { 
        header: 'Status', 
        accessor: (row: User) => (
            <span className={row.status === 'Ativo' ? 'text-emerald-400' : 'text-red-400'}>
                {row.status}
            </span>
        ) 
    },
    { header: 'Último Login', accessor: 'lastLogin' as keyof User },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuários</h1>
          <p className="text-slate-400">Controle de acesso e usuários do sistema.</p>
        </div>
        <Button>
            <Plus size={18} className="mr-2" />
            Novo Usuário
        </Button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 max-w-lg">
        <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Buscar usuários..." className="pl-10" />
        </div>
      </div>

      <DataTable 
        data={mockUsers}
        columns={columns}
        keyField="id"
      />
    </div>
  );
};

export default Users;
