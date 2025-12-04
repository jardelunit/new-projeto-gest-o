// # Contexto: listagem de fretes com busca.
// # Responsabilidades: renderizar tabela com origem/destino, motorista, veículo, valor e ação de detalhes.

import React from 'react';
import { Button, DataTable, Input } from '../../../../components/ui/Common';
import { Freight } from '../../../../types';
import { Filter, Plus, Search, Truck, User } from 'lucide-react';
import { getStatusColor } from '../utils/formatters';

interface FreightListProps {
  freights: Freight[];
  onSelect: (freight: Freight) => void;
  onAdd: () => void;
  getDriverName: (id?: string) => string;
  getVehiclePlate: (id?: string) => string;
}

const FreightList: React.FC<FreightListProps> = ({
  freights,
  onSelect,
  onAdd,
  getDriverName,
  getVehiclePlate,
}) => {
  const columns = [
    {
      header: 'Origem -> Destino',
      accessor: (row: Freight) => (
        <div>
          <div className="font-bold text-white flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {row.origin}
          </div>
          <div className="pl-4 border-l border-slate-700 ml-1 my-1"></div>
          <div className="font-bold text-white flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            {row.destination}
          </div>
        </div>
      ),
    },
    {
      header: 'Motorista / Veículo',
      accessor: (row: Freight) => (
        <div className="text-sm">
          <p className="text-white flex items-center">
            <User size={12} className="mr-1 text-slate-400" /> {getDriverName(row.driverId)}
          </p>
          <p className="text-slate-400 flex items-center mt-1">
            <Truck size={12} className="mr-1" /> {getVehiclePlate(row.vehicleId)}
          </p>
        </div>
      ),
    },
    { header: 'Data', accessor: 'date' as keyof Freight },
    {
      header: 'Valor',
      accessor: (row: Freight) => <span className="text-emerald-400 font-bold">R$ {row.value.toLocaleString()}</span>,
    },
    {
      header: 'Status',
      accessor: (row: Freight) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Ações',
      accessor: (row: Freight) => (
        <Button
          variant="ghost"
          className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:text-white"
          onClick={() => onSelect(row)}
        >
          Detalhes
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestão de Fretes</h1>
          <p className="text-slate-400">Controle total das viagens, status e financeiro.</p>
        </div>
        <Button onClick={onAdd}>
          <Plus size={18} className="mr-2" />
          Novo Frete
        </Button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input placeholder="Buscar por cidade, motorista..." className="pl-10" />
        </div>
        <Button variant="secondary">
          <Filter size={16} className="mr-2" /> Status
        </Button>
      </div>

      <DataTable data={freights} columns={columns} keyField="id" />
    </div>
  );
};

export default FreightList;
