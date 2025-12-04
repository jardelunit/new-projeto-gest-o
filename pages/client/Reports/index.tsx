// # Contexto: central de relatórios do cliente.
// # Responsabilidades: renderizar filtros, ações de exportação/impressão e pré-visualização dos dados.

import React from 'react';
import { Filter, Table } from 'lucide-react';
import { Card } from '../../../components/ui/Common';
import ReportsActions from './components/ReportsActions';
import ReportsFilters from './components/ReportsFilters';
import ReportsHeader from './components/ReportsHeader';
import ReportsPreview from './components/ReportsPreview';
import useReports from './hooks/useReports';

const Reports: React.FC = () => {
  const {
    drivers,
    endDate,
    handleExport,
    handleReportChange,
    isExporting,
    reportData,
    reportOptions,
    selectedEntityId,
    selectedReport,
    setEndDate,
    setSelectedEntityId,
    setStartDate,
    startDate,
    vehicles
  } = useReports();

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Filter size={20} />
          <h3 className="font-bold text-lg">Configuração do Relatório</h3>
        </div>

        <ReportsFilters
          drivers={drivers}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onEntityChange={setSelectedEntityId}
          onReportChange={handleReportChange}
          onStartDateChange={setStartDate}
          reportOptions={reportOptions}
          selectedEntityId={selectedEntityId}
          selectedReport={selectedReport}
          startDate={startDate}
          vehicles={vehicles}
        />

        <ReportsActions isExporting={isExporting} onExport={handleExport} onPrint={() => window.print()} />
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Table size={20} />
          <h3 className="font-semibold">Pré-visualização dos Dados</h3>
        </div>
        <ReportsPreview reportData={reportData} selectedReport={selectedReport} vehicles={vehicles} />
      </div>
    </div>
  );
};

export default Reports;
