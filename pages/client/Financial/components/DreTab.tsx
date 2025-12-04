// # Contexto: aba de DRE gerencial.
// # Responsabilidades: apresentar estrutura de resultados com margens e lucro líquido.

import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../../../../components/ui/Common';
import { DreData } from '../services/financialService';
import { formatProfitMargin } from '../utils/formatters';
import DRERow from './DRERow';

type DreTabProps = {
  dreData: DreData;
};

const DreTab: React.FC<DreTabProps> = ({ dreData }) => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
    <Card title="Demonstrativo de Resultados (DRE)" className="border-t-4 border-t-blue-500">
      <div className="space-y-1 p-2">
        <div className="flex justify-between items-center pb-4 mb-2 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Estrutura</h3>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-300">Dezembro 2023</span>
          </div>
        </div>

        <DRERow label="(+) Receita Operacional Bruta" value={dreData.grossRevenue} type="positive" />
        <DRERow label="(-) Impostos e Deduções" value={dreData.taxes} type="negative" indent />
        <DRERow label="(=) Receita Líquida" value={dreData.netRevenue} type="total" />

        <div className="py-4"></div>

        <DRERow label="(-) Custos Variáveis (Combustível, Manutenção)" value={dreData.variableCosts} type="negative" indent />
        <DRERow label="(=) Margem de Contribuição" value={dreData.contributionMargin} type="total" />

        <div className="py-4"></div>

        <DRERow label="(-) Despesas Fixas (Pessoal, Aluguel)" value={dreData.fixedExpenses} type="negative" indent />

        <div className="py-4 border-b border-slate-600"></div>

        <DRERow label="(=) Lucro Líquido do Exercício" value={dreData.netProfit} type="total" />

        <div className="mt-6 p-4 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
          <span className="text-slate-400">Margem de Lucro:</span>
          <span className={`text-xl font-bold ${dreData.netProfit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatProfitMargin(dreData.netProfit, dreData.grossRevenue)}
          </span>
        </div>
      </div>
    </Card>
  </div>
);

export default DreTab;
