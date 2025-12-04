// # Contexto: filtros dos relatórios.
// # Responsabilidades: selecionar tipo de relatório, período e entidade relacionada (veículo/motorista).

import React from 'react';
import { Input, Select } from '../../../../components/ui/Common';
import { Driver, Vehicle } from '../../../../types';
import { ReportOption, ReportType } from '../hooks/useReports';

type ReportsFiltersProps = {
  selectedReport: ReportType;
  selectedEntityId: string;
  startDate: string;
  endDate: string;
  reportOptions: ReportOption[];
  vehicles: Vehicle[];
  drivers: Driver[];
  onReportChange: (report: ReportType) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onEntityChange: (value: string) => void;
};

const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  drivers,
  endDate,
  onEndDateChange,
  onEntityChange,
  onReportChange,
  onStartDateChange,
  reportOptions,
  selectedEntityId,
  selectedReport,
  startDate,
  vehicles
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Select
        label="Tipo de Relatório"
        options={reportOptions}
        value={selectedReport}
        onChange={event => onReportChange(event.target.value as ReportType)}
      />

      <Input label="Data Início" type="date" value={startDate} onChange={event => onStartDateChange(event.target.value)} />

      <Input label="Data Fim" type="date" value={endDate} onChange={event => onEndDateChange(event.target.value)} />

      {selectedReport === 'expenses_vehicle' && (
        <Select
          label="Veículo (Opcional)"
          options={[{ value: '', label: 'Todos os Veículos' }, ...vehicles.map(vehicle => ({ value: vehicle.id, label: `${vehicle.plate} - ${vehicle.model}` }))]}
          value={selectedEntityId}
          onChange={event => onEntityChange(event.target.value)}
        />
      )}

      {selectedReport === 'driver_performance' && (
        <Select
          label="Motorista (Opcional)"
          options={[{ value: '', label: 'Todos os Motoristas' }, ...drivers.map(driver => ({ value: driver.id, label: driver.name }))]}
          value={selectedEntityId}
          onChange={event => onEntityChange(event.target.value)}
        />
      )}
    </div>
  );
};

export default ReportsFilters;
