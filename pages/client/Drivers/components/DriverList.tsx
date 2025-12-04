// # Contexto: listagem de motoristas.
// # Responsabilidades: exibir dados principais, status de CNH e acionar gestão individual.

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button, DataTable } from '../../../../components/ui/Common';
import { Driver } from '../../../../types';
import { getCNHStatus } from '../utils/validators';

interface DriverListProps {
    drivers: Driver[];
    onSelect: (driver: Driver) => void;
}

const DriverList: React.FC<DriverListProps> = ({ drivers, onSelect }) => {
    const columns = [
        {
            header: 'Nome',
            accessor: (row: Driver) => (
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-3 font-bold text-slate-300">
                        {row.name.charAt(0)}
                    </div>
                    <div className="font-medium text-white">{row.name}</div>
                </div>
            ),
        },
        { header: 'Telefone', accessor: 'phone' as keyof Driver },
        { header: 'CNH', accessor: 'cnh' as keyof Driver },
        {
            header: 'Categoria',
            accessor: (row: Driver) => <span className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-white">{row.cnhCategory}</span>,
        },
        {
            header: 'Validade CNH',
            accessor: (row: Driver) => {
                const status = getCNHStatus(row.cnhExpiry);
                return (
                    <div className="flex items-center">
                        <span className="mr-2">{new Date(row.cnhExpiry).toLocaleDateString()}</span>
                        {(status.label === 'Vencida' || status.label === 'A Vencer') && (
                            <AlertTriangle size={14} className={status.label === 'Vencida' ? 'text-red-500' : 'text-yellow-500'} />
                        )}
                    </div>
                );
            },
        },
        {
            header: 'Status',
            accessor: (row: Driver) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                        row.status === 'Ativo'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : row.status === 'De Licença'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-slate-500/20 text-slate-400'
                    }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Ações',
            accessor: (row: Driver) => (
                <Button
                    variant="ghost"
                    className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:text-white"
                    onClick={() => onSelect(row)}
                >
                    Gerenciar
                </Button>
            ),
        },
    ];

    return <DataTable data={drivers} columns={columns} keyField="id" />;
};

export default DriverList;
