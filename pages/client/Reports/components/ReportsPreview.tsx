// # Contexto: pré-visualização dos relatórios.
// # Responsabilidades: renderizar tabelas dinâmicas conforme o tipo selecionado ou mostrar vazio.

import React from 'react';
import { DataTable } from '../../../../components/ui/Common';
import { Expense, Freight, Vehicle } from '../../../../types';
import { DriverPerformance, ProfitSummary, ReportType } from '../hooks/useReports';
import { formatCurrency } from '../utils/formatters';

type ReportsPreviewProps = {
  selectedReport: ReportType;
  reportData: Array<Freight | Expense | DriverPerformance | ProfitSummary>;
  vehicles: Vehicle[];
};

const ReportsPreview: React.FC<ReportsPreviewProps> = ({ selectedReport, reportData, vehicles }) => {
  if (!reportData || reportData.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-lg">
        Nenhum dado encontrado para os filtros selecionados.
      </div>
    );
  }

  switch (selectedReport) {
    case 'freights_period':
      return (
        <DataTable
          data={reportData as Freight[]}
          keyField="id"
          columns={[
            { header: 'Data', accessor: 'date' },
            { header: 'Origem', accessor: 'origin' },
            { header: 'Destino', accessor: 'destination' },
            { header: 'Status', accessor: 'status' },
            { header: 'Valor', accessor: row => formatCurrency(row.value) }
          ]}
        />
      );

    case 'expenses_vehicle':
      return (
        <DataTable
          data={reportData as Expense[]}
          keyField="id"
          columns={[
            { header: 'Data', accessor: 'date' },
            {
              header: 'Veículo',
              accessor: row => vehicles.find(vehicle => vehicle.id === row.vehicleId)?.plate || 'N/A'
            },
            { header: 'Categoria', accessor: 'category' },
            { header: 'Descrição', accessor: 'description' },
            { header: 'Valor', accessor: row => <span className="text-red-400">{formatCurrency(row.amount)}</span> }
          ]}
        />
      );

    case 'driver_performance':
      return (
        <DataTable
          data={reportData as DriverPerformance[]}
          keyField="id"
          columns={[
            { header: 'Motorista', accessor: 'name', className: 'text-white font-bold' },
            { header: 'CNH', accessor: 'cnh' },
            { header: 'Total Viagens', accessor: 'trips' },
            {
              header: 'Total Faturado',
              accessor: row => <span className="text-emerald-400 font-bold">{formatCurrency(row.totalValue)}</span>
            }
          ]}
        />
      );

    case 'profit_comparison':
    case 'financial_summary':
      return (
        <DataTable
          data={reportData as ProfitSummary[]}
          keyField="id"
          columns={[
            { header: 'Período', accessor: 'period' },
            { header: 'Receita Total', accessor: row => <span className="text-emerald-400">{formatCurrency(row.revenue)}</span> },
            { header: 'Despesa Total', accessor: row => <span className="text-red-400">{formatCurrency(row.expense)}</span> },
            {
              header: 'Resultado',
              accessor: row => (
                <span className={`font-bold ${row.profit > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {formatCurrency(row.profit)}
                </span>
              )
            }
          ]}
        />
      );

    default:
      return null;
  }
};

export default ReportsPreview;
