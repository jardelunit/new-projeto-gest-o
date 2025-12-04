// # Contexto: grade de KPIs do dashboard do cliente.
// # Responsabilidades: renderizar cartões com ícones dinâmicos baseados no rótulo.

import React from 'react';
import { DollarSign, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { KPI } from '../../../../types';
import { KPICard } from '../../../../components/ui/Common';
import { formatCurrency } from '../utils/formatters';

type KpiGridProps = {
  kpis: KPI[];
};

const resolveKpiIcon = (label: string) => {
  if (label.includes('Lucro')) return <TrendingUp size={20} />;
  if (label.includes('Receber')) return <DollarSign size={20} />;
  if (label.includes('Pagar')) return <TrendingDown size={20} />;
  return <Package size={20} />;
};

const KpiGrid: React.FC<KpiGridProps> = ({ kpis }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {kpis.map((kpi) => (
      <KPICard
        key={kpi.label}
        title={kpi.label}
        value={kpi.isCurrency ? formatCurrency(kpi.value) : kpi.value}
        change={kpi.change}
        icon={resolveKpiIcon(kpi.label)}
      />
    ))}
  </div>
);

export default KpiGrid;
