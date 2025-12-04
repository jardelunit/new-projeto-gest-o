// # Contexto: módulo financeiro do cliente.
// # Responsabilidades: renderizar header, tabs e conteúdo das abas overview, pagar, receber e DRE.

import React from 'react';
import FinancialHeader from './components/FinancialHeader';
import FinancialTabs from './components/FinancialTabs';
import DreTab from './components/DreTab';
import OverviewTab from './components/OverviewTab';
import PayablesTab from './components/PayablesTab';
import ReceivablesTab from './components/ReceivablesTab';
import useFinancial from './hooks/useFinancial';

const Financial: React.FC = () => {
  const { activeTab, setActiveTab, receivables, payables, dreData } = useFinancial();

  return (
    <div className="space-y-6">
      <FinancialHeader />
      <FinancialTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && <OverviewTab dreData={dreData} />}
      {activeTab === 'payable' && <PayablesTab payables={payables} />}
      {activeTab === 'receivable' && <ReceivablesTab receivables={receivables} />}
      {activeTab === 'dre' && <DreTab dreData={dreData} />}
    </div>
  );
};

export default Financial;
