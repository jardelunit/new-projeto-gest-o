// # Contexto: gestão de motoristas.
// # Responsabilidades: controlar busca/filtro, acionar cadastro e listar motoristas.

import React from 'react';
import { Plus, Search, UserCheck } from 'lucide-react';
import { Button, Input, Select } from '../../../../components/ui/Common';
import { Driver } from '../../../../types';
import DriverList from './DriverList';
import CreateDriverModal from '../modals/CreateDriverModal';

type DriverManagerProps = {
    drivers: Driver[];
    filterStatus: Driver['status'] | 'Todos';
    searchTerm: string;
    onFilterChange: (status: Driver['status'] | 'Todos') => void;
    onSearchChange: (value: string) => void;
    onSelectDriver: (driver: Driver) => void;
    isCreateModalOpen: boolean;
    onOpenCreateModal: () => void;
    onCloseCreateModal: () => void;
    onSubmitDriver: (e: React.FormEvent) => void;
    newDriver: Partial<Driver>;
    onNewDriverChange: (field: keyof Driver, value: string) => void;
};

const DriverManager: React.FC<DriverManagerProps> = ({
    drivers,
    filterStatus,
    searchTerm,
    onFilterChange,
    onSearchChange,
    onSelectDriver,
    isCreateModalOpen,
    onOpenCreateModal,
    onCloseCreateModal,
    onSubmitDriver,
    newDriver,
    onNewDriverChange,
}) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/70 backdrop-blur p-4 rounded-lg border border-slate-700/70 shadow-lg shadow-slate-900/40">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        <UserCheck size={18} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Motoristas</h2>
                        <p className="text-slate-400 text-sm">Busca, filtro rápido e gestão centralizada.</p>
                    </div>
                </div>
                <Button onClick={onOpenCreateModal}>
                    <Plus size={18} className="mr-2" />
                    Cadastrar Motorista
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Buscar por nome, CNH ou telefone..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={e => onSearchChange(e.target.value)}
                    />
                </div>
                <Select
                    options={[
                        { value: 'Todos', label: 'Todos os Status' },
                        { value: 'Ativo', label: 'Ativo' },
                        { value: 'De Licença', label: 'De Licença' },
                        { value: 'Férias', label: 'Férias' },
                    ]}
                    value={filterStatus}
                    onChange={e => onFilterChange(e.target.value as Driver['status'] | 'Todos')}
                    className="w-full md:w-56"
                />
            </div>

            <DriverList drivers={drivers} onSelect={onSelectDriver} />

            <CreateDriverModal
                isOpen={isCreateModalOpen}
                onClose={onCloseCreateModal}
                onSubmit={onSubmitDriver}
                newDriver={newDriver}
                onChange={onNewDriverChange}
            />
        </div>
    );
};

export default DriverManager;
