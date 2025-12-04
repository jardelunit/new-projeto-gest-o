// # Contexto: módulo de motoristas.
// # Responsabilidades: orquestrar abas de visão geral e gestão, além de detalhe do motorista.

import React, { useMemo } from 'react';
import { Users, ShieldAlert, FileWarning, MapPin } from 'lucide-react';
import DriverDetail from './components/DriverDetail';
import DriverOverview from './components/DriverOverview';
import DriverManager from './components/DriverManager';
import useDrivers, { DriverTab } from './hooks/useDrivers';
import FineModal from './modals/FineModal';

const Drivers: React.FC = () => {
    const {
        activeTab,
        handleTabChange,
        drivers,
        fines,
        freights,
        filteredDrivers,
        filters,
        selectedDriver,
        relations,
        newDriver,
        quickCounts,
        isCreateModalOpen,
        isFineModalOpen,
        selectDriver,
        goBackToList,
        openCreateModal,
        closeCreateModal,
        openFineModal,
        closeFineModal,
        handleCreateDriver,
        handleNewDriverChange,
        handleFilterChange,
    } = useDrivers();

    const tabConfig = useMemo(
        () => [
            { id: 'overview', label: 'Visão Geral', icon: <Users size={18} /> },
            { id: 'drivers', label: 'Equipe', icon: <MapPin size={18} /> },
        ],
        [],
    );

    const quickStats = useMemo(
        () => [
            {
                label: 'Ativos',
                value: `${quickCounts.active}/${quickCounts.total}`,
                tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
                icon: <Users size={14} />,
            },
            {
                label: 'CNH Atenção',
                value: quickCounts.expiring,
                tone: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
                icon: <ShieldAlert size={14} />,
            },
            {
                label: 'Multas Pendentes',
                value: quickCounts.pendingFines,
                tone: 'border-red-500/30 bg-red-500/10 text-red-300',
                icon: <FileWarning size={14} />,
            },
            {
                label: 'Em Rota',
                value: quickCounts.onRoute,
                tone: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
                icon: <MapPin size={14} />,
            },
        ],
        [quickCounts],
    );

    if (selectedDriver && relations) {
        return (
            <>
                <DriverDetail
                    driver={selectedDriver}
                    vehicle={relations.vehicle}
                    freights={relations.freights}
                    expenses={relations.expenses}
                    fines={relations.fines}
                    onBack={goBackToList}
                    onOpenFineModal={openFineModal}
                />
                <FineModal isOpen={isFineModalOpen} onClose={closeFineModal} />
            </>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800/70 rounded-lg p-4 shadow-lg shadow-slate-900/40">
                <h1 className="text-3xl font-bold text-white">Gestão de Motoristas</h1>
                <p className="text-slate-400">Visão centralizada da equipe, licenças e multas.</p>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickStats.map(stat => (
                        <div
                            key={stat.label}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm shadow-inner shadow-slate-900/40 ${stat.tone}`}
                        >
                            <span className="flex items-center gap-2 text-slate-200">
                                <span className="p-1 rounded bg-slate-900/50 border border-slate-800">{stat.icon}</span>
                                {stat.label}
                            </span>
                            <span className="font-bold">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex overflow-x-auto gap-2 bg-slate-900/60 rounded-lg p-1 border border-slate-800/70">
                {tabConfig.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as DriverTab)}
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md whitespace-nowrap border ${
                            activeTab === tab.id
                                ? 'bg-blue-600/20 text-blue-200 border-blue-500/40 shadow-lg shadow-blue-900/30'
                                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-2">
                {activeTab === 'overview' && (
                    <DriverOverview
                        drivers={drivers}
                        fines={fines}
                        freights={freights}
                        quickCounts={quickCounts}
                        onSelectDriver={selectDriver}
                    />
                )}
                {activeTab === 'drivers' && (
                    <DriverManager
                        drivers={filteredDrivers}
                        filterStatus={filters.status}
                        searchTerm={filters.term}
                        onFilterChange={value => handleFilterChange('status', value)}
                        onSearchChange={value => handleFilterChange('term', value)}
                        onSelectDriver={selectDriver}
                        isCreateModalOpen={isCreateModalOpen}
                        onOpenCreateModal={openCreateModal}
                        onCloseCreateModal={closeCreateModal}
                        onSubmitDriver={handleCreateDriver}
                        newDriver={newDriver}
                        onNewDriverChange={handleNewDriverChange}
                    />
                )}
            </div>
        </div>
    );
};

export default Drivers;
