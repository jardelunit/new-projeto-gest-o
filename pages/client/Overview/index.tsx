// # Contexto: tela inicial do cliente com KPIs, gráfico e cards principais.
// # Responsabilidades: usa o hook de overview para renderizar KPIs, fretes recentes e ações rápidas.

import React from 'react';
import { ProfitLossChart } from '../../../components/charts/DashboardCharts';
import KpiGrid from './components/KpiGrid';
import QuickActions from './components/QuickActions';
import RecentFreights from './components/RecentFreights';
import UpgradeCard from './components/UpgradeCard';
import useOverview from './hooks/useOverview';

const Overview: React.FC = () => {
  const { title, subtitle, kpis, freights, freightColumns } = useOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-slate-400">{subtitle}</p>
      </div>

      <KpiGrid kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfitLossChart />
          <RecentFreights freights={freights} columns={freightColumns} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <QuickActions />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
};

export default Overview;
