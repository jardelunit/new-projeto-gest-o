// # Contexto: aba de visão geral financeira.
// # Responsabilidades: mostrar KPIs de receita/despesa, gráfico e resumos rápidos.

import React from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { ProfitLossChart } from '../../../../components/charts/DashboardCharts';
import { Card, KPICard } from '../../../../components/ui/Common';
import { DreData } from '../services/financialService';
import { formatCurrency } from '../utils/formatters';

type OverviewTabProps = {
  dreData: DreData;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ dreData }) => {
  const totalExpenses = dreData.variableCosts + dreData.fixedExpenses + dreData.taxes;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Receita Bruta (Mês)"
          value={formatCurrency(dreData.grossRevenue)}
          change={12}
          icon={<TrendingUp />}
        />
        <KPICard
          title="Despesas Totais (Mês)"
          value={formatCurrency(totalExpenses)}
          change={5}
          icon={<TrendingDown />}
        />
        <KPICard title="Lucro Líquido" value={formatCurrency(dreData.netProfit)} change={18} icon={<DollarSign />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfitLossChart />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card title="Resumo Rápido">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
                <div className="text-sm text-slate-400">A Pagar Hoje</div>
                <div className="font-bold text-red-400">{formatCurrency(1250, { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
                <div className="text-sm text-slate-400">A Receber Hoje</div>
                <div className="font-bold text-emerald-400">{formatCurrency(3400, { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
                <div className="text-sm text-slate-400">Saldo Previsto</div>
                <div className="font-bold text-blue-400">{formatCurrency(2150, { minimumFractionDigits: 2 })}</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <h3 className="text-white font-semibold mb-2">Ponto de Equilíbrio</h3>
            <p className="text-sm text-slate-400 mb-4">Você precisa faturar R$ 15.000 para cobrir custos fixos.</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-right text-xs text-blue-400 mt-1">75% atingido</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
