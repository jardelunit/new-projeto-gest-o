// # Contexto: hook de dados da visão geral.
// # Responsabilidades: buscar KPIs/fretes mock e montar colunas da tabela de fretes recentes.

import React, { useMemo } from 'react';
import { Freight, KPI } from '../../../../types';
import { getClientKpis, getFreights } from '../services/overviewService';
import { formatCurrency, getFreightStatusClass } from '../utils/formatters';

export type FreightColumn = {
  header: string;
  accessor: keyof Freight | ((row: Freight) => React.ReactNode);
  className?: string;
};

const buildFreightColumns = (): FreightColumn[] => [
  { header: 'Origem', accessor: 'origin' },
  { header: 'Destino', accessor: 'destination' },
  {
    header: 'Valor',
    accessor: (row: Freight) => (
      <span className="font-medium text-slate-200">{formatCurrency(row.value)}</span>
    ),
  },
  {
    header: 'Status',
    accessor: (row: Freight) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${getFreightStatusClass(row.status)}`}>
        {row.status}
      </span>
    ),
  },
  { header: 'Data', accessor: 'date' },
];

const useOverview = () => {
  const kpis = useMemo<KPI[]>(() => getClientKpis(), []);
  const freights = useMemo<Freight[]>(() => getFreights(), []);
  const freightColumns = useMemo<FreightColumn[]>(() => buildFreightColumns(), []);

  return {
    title: 'Dashboard Operacional',
    subtitle: 'Visão geral do desempenho da sua transportadora.',
    kpis,
    freights,
    freightColumns,
  };
};

export default useOverview;
