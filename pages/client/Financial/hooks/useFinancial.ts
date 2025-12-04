// # Contexto: hook do financeiro.
// # Responsabilidades: controlar aba ativa e fornecer dados mock de recebíveis, pagáveis e DRE.

import { useMemo, useState } from 'react';
import { DreData, Payable, Receivable, getDreData, getPayables, getReceivables } from '../services/financialService';

export type FinancialTabId = 'overview' | 'payable' | 'receivable' | 'dre';

const useFinancial = () => {
  const [activeTab, setActiveTab] = useState<FinancialTabId>('overview');

  const receivables = useMemo<Receivable[]>(() => getReceivables(), []);
  const payables = useMemo<Payable[]>(() => getPayables(), []);
  const dreData = useMemo<DreData>(() => getDreData(), []);

  return {
    activeTab,
    setActiveTab,
    receivables,
    payables,
    dreData,
  };
};

export default useFinancial;
