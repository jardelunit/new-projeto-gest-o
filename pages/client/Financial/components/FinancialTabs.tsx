// # Contexto: navegação do financeiro.
// # Responsabilidades: alternar entre overview, pagar, receber e DRE.

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, FileText, PieChart } from 'lucide-react';
import { FinancialTabId } from '../hooks/useFinancial';

type FinancialTabsProps = {
  activeTab: FinancialTabId;
  onTabChange: (tab: FinancialTabId) => void;
};

const tabs: { id: FinancialTabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Visão Geral', icon: <PieChart size={18} /> },
  { id: 'payable', label: 'Contas a Pagar', icon: <ArrowDownLeft size={18} /> },
  { id: 'receivable', label: 'Contas a Receber', icon: <ArrowUpRight size={18} /> },
  { id: 'dre', label: 'DRE Gerencial', icon: <FileText size={18} /> },
];

const FinancialTabs: React.FC<FinancialTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex border-b border-slate-700 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
          activeTab === tab.id
            ? 'border-blue-500 text-blue-400'
            : 'border-transparent text-slate-400 hover:text-slate-200'
        }`}
        type="button"
      >
        <span className="mr-2">{tab.icon}</span>
        {tab.label}
      </button>
    ))}
  </div>
);

export default FinancialTabs;
