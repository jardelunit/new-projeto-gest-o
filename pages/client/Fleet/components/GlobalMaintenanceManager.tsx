// # Contexto: visão consolidada de manutenções.
// # Responsabilidades: exibir métricas rápidas e tabela de serviços com status.

import React from 'react';
import { Filter, Download, Plus, DollarSign, Clock } from 'lucide-react';
import { Button, Card, DataTable } from '../../../../components/ui/Common';
import { Maintenance } from '../../../../types';
import { formatCurrency } from '../utils/formatters';

type GlobalMaintenanceManagerProps = {
  maintenances: Maintenance[];
};

const GlobalMaintenanceManager: React.FC<GlobalMaintenanceManagerProps> = ({ maintenances }) => {
  const totalCost = maintenances.reduce((acc, maintenance) => acc + maintenance.cost, 0);
  const pending = maintenances.filter((maintenance) => maintenance.status !== 'Concluída').length;

  const columns = [
    { header: 'Veículo', accessor: 'vehicleId' as keyof Maintenance, className: 'font-mono text-white font-bold' },
    { header: 'Serviço', accessor: 'description' as keyof Maintenance },
    {
      header: 'Tipo',
      accessor: (row: Maintenance) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.type === 'Preventiva' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
          }`}
        >
          {row.type}
        </span>
      ),
    },
    { header: 'Data', accessor: 'date' as keyof Maintenance },
    {
      header: 'Custo',
      accessor: (row: Maintenance) => <span className="font-bold text-slate-200">{formatCurrency(row.cost)}</span>,
    },
    {
      header: 'Status',
      accessor: (row: Maintenance) => {
        const colors = {
          Concluída: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          Agendada: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          'Em Andamento': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        } as const;
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 border-blue-500/30 p-4 flex items-center justify-between shadow-lg shadow-blue-900/30">
          <div>
            <p className="text-slate-400 text-sm">Custo Total (Mês)</p>
            <h3 className="text-2xl font-bold text-white">{formatCurrency(totalCost, { minimumFractionDigits: 0 })}</h3>
          </div>
          <div className="p-3 bg-blue-500/20 rounded text-blue-400">
            <DollarSign />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-4 flex items-center justify-between shadow-lg shadow-amber-900/30">
          <div>
            <p className="text-slate-400 text-sm">Manutenções Pendentes</p>
            <h3 className="text-2xl font-bold text-yellow-400">{pending}</h3>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded text-yellow-400">
            <Clock />
          </div>
        </Card>
        <Button className="h-full flex items-center justify-center text-lg">
          <Plus size={24} className="mr-2" /> Agendar Manutenção
        </Button>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-bold text-white">Histórico de Serviços</h3>
        <div className="flex gap-2">
          <Button variant="ghost">
            <Filter size={16} className="mr-2" /> Filtrar
          </Button>
          <Button variant="ghost">
            <Download size={16} className="mr-2" /> Exportar
          </Button>
        </div>
      </div>

      <DataTable data={maintenances} columns={columns} keyField="id" />
    </div>
  );
};

export default GlobalMaintenanceManager;
