// # Contexto: módulo de gestão de frota com abas.
// # Responsabilidades: controla aba ativa, filtros e exibe visão geral, veículos, manutenção, docs e relatório.

import React, { useMemo } from 'react';
import { Activity, Truck, Wrench, FileText, BarChart3 } from 'lucide-react';
import FleetOverview from './components/FleetOverview';
import VehicleManager from './components/VehicleManager';
import GlobalMaintenanceManager from './components/GlobalMaintenanceManager';
import GlobalDocumentsManager from './components/GlobalDocumentsManager';
import FleetReport from './components/FleetReport';
import VehicleDetails from './components/VehicleDetails';
import useFleet, { FleetTab } from './hooks/useFleet';

const FleetModule: React.FC = () => {
  const {
    activeTab,
    handleTabChange,
    tabs,
    vehicles,
    documents,
    maintenances,
    filteredVehicles,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    selectedVehicle,
    selectVehicle,
    clearSelectedVehicle,
    reportVehicleId,
    setReportVehicleId,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    quickCounts,
    statusTone,
    fleetSummary,
    getVehicleSnapshot,
  } = useFleet();

  const quickStats = useMemo(
    () => [
      { label: 'Disponíveis', value: `${quickCounts.available}/${quickCounts.totalVehicles}`, tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300', icon: <Truck size={14} /> },
      { label: 'Em Trânsito', value: quickCounts.inTransit, tone: 'border-blue-500/30 bg-blue-500/10 text-blue-300', icon: <Activity size={14} /> },
      { label: 'Docs a Vencer', value: quickCounts.docsDue, tone: 'border-amber-500/30 bg-amber-500/10 text-amber-300', icon: <FileText size={14} /> },
      { label: 'Manutenções', value: quickCounts.maintPending, tone: 'border-red-500/30 bg-red-500/10 text-red-300', icon: <Wrench size={14} /> },
    ],
    [quickCounts],
  );

  const tabConfig = useMemo(
    () => [
      { id: 'overview', label: 'Visão Geral', icon: <Activity size={18} /> },
      { id: 'vehicles', label: 'Veículos', icon: <Truck size={18} /> },
      { id: 'maintenance', label: 'Manutenção', icon: <Wrench size={18} /> },
      { id: 'docs', label: 'Documentos', icon: <FileText size={18} /> },
      { id: 'report', label: 'Relatório de Frota', icon: <BarChart3 size={18} /> },
    ],
    [],
  );

  if (selectedVehicle) {
    const snapshot = getVehicleSnapshot(selectedVehicle.id);
    if (!snapshot) return null;

    return <VehicleDetails snapshot={snapshot} statusTone={statusTone} onBack={clearSelectedVehicle} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800/70 rounded-lg p-4 shadow-lg shadow-slate-900/40">
        <h1 className="text-3xl font-bold text-white">Gestão de Frota</h1>
        <p className="text-slate-400">Controle centralizado de veículos, manutenções, documentos e custos.</p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((stat) => (
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
        {tabConfig
          .filter((tab) => tabs.includes(tab.id as FleetTab))
          .map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as FleetTab)}
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
        {activeTab === 'overview' && <FleetOverview vehicles={vehicles} />}
        {activeTab === 'vehicles' && (
          <VehicleManager
            filteredVehicles={filteredVehicles}
            filterStatus={filterStatus}
            searchTerm={searchTerm}
            onFilterChange={setFilterStatus}
            onSearchChange={setSearchTerm}
            onSelectVehicle={selectVehicle}
            statusTone={statusTone}
            isCreateModalOpen={isCreateModalOpen}
            onOpenCreateModal={openCreateModal}
            onCloseCreateModal={closeCreateModal}
          />
        )}
        {activeTab === 'maintenance' && <GlobalMaintenanceManager maintenances={maintenances} />}
        {activeTab === 'docs' && <GlobalDocumentsManager documents={documents} />}
        {activeTab === 'report' && (
          <FleetReport
            fleetSummary={fleetSummary}
            selectedVehicleId={reportVehicleId}
            onSelectVehicle={setReportVehicleId}
            getVehicleSnapshot={getVehicleSnapshot}
          />
        )}
      </div>
    </div>
  );
};

export default FleetModule;
