// # Contexto: gestão de veículos com filtros e busca.
// # Responsabilidades: filtrar lista por status/termo, abrir cadastro e encaminhar seleção para detalhes.

import React from 'react';
import { Search, Plus, Truck, Activity, ChevronRight } from 'lucide-react';
import { Button, DataTable, Input, Select } from '../../../../components/ui/Common';
import { Vehicle } from '../../../../types';
import CreateVehicleModal from '../modals/CreateVehicleModal';

type VehicleManagerProps = {
  filteredVehicles: Vehicle[];
  filterStatus: string;
  searchTerm: string;
  onFilterChange: (status: string) => void;
  onSearchChange: (value: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  statusTone: Record<Vehicle['status'], string>;
  isCreateModalOpen: boolean;
  onOpenCreateModal: () => void;
  onCloseCreateModal: () => void;
};

const VehicleManager: React.FC<VehicleManagerProps> = ({
  filteredVehicles,
  filterStatus,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onSelectVehicle,
  statusTone,
  isCreateModalOpen,
  onOpenCreateModal,
  onCloseCreateModal,
}) => {
  const columns = [
    {
      header: 'Veículo',
      accessor: (row: Vehicle) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center mr-3 border border-slate-700">
            <Truck className="text-slate-400" />
          </div>
          <div>
            <div className="font-bold text-white">{row.plate}</div>
            <div className="text-xs text-slate-400">{row.model}</div>
          </div>
        </div>
      ),
    },
    { header: 'Ano', accessor: 'year' as keyof Vehicle },
    {
      header: 'Status',
      accessor: (row: Vehicle) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusTone[row.status]}`}>{row.status}</span>
      ),
    },
    {
      header: 'Hodômetro',
      accessor: (row: Vehicle) => (
        <div className="font-mono text-slate-300 flex items-center gap-2">
          <Activity size={14} /> {row.currentKm.toLocaleString()} km
        </div>
      ),
    },
    { header: 'Última Manut.', accessor: 'lastMaintenance' as keyof Vehicle },
    {
      header: '',
      accessor: (row: Vehicle) => (
        <Button variant="secondary" className="text-xs" onClick={() => onSelectVehicle(row)}>
          Detalhes <ChevronRight size={14} className="ml-1" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/70 backdrop-blur p-4 rounded-lg border border-slate-700/70 shadow-lg shadow-slate-900/40">
        <div className="flex gap-4 flex-1 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Buscar placa ou modelo..." className="pl-10" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
          <Select
            options={[
              { value: 'Todos', label: 'Todos os Status' },
              { value: 'Disponível', label: 'Disponível' },
              { value: 'Em Trânsito', label: 'Em Trânsito' },
              { value: 'Manutenção', label: 'Manutenção' },
            ]}
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-48"
          />
        </div>
        <Button onClick={onOpenCreateModal}>
          <Plus size={18} className="mr-2" />
          Novo Veículo
        </Button>
      </div>

      <DataTable data={filteredVehicles} columns={columns} keyField="id" />

      <CreateVehicleModal isOpen={isCreateModalOpen} onClose={onCloseCreateModal} />
    </div>
  );
};

export default VehicleManager;
