// # Contexto: hook central do módulo de CT-e/MDF-e.
// # Responsabilidades: carregar dados mock, agregar indicadores e expor ações básicas (refresh/criação de rascunho).

import { useCallback, useMemo, useState } from 'react';
import {
  ComplianceAlert,
  CreateDraftPayload,
  ElectronicDocStatus,
  ElectronicDocType,
  ElectronicDocument,
  IntegrationStatus,
  createDraftDocument,
  fetchComplianceAlerts,
  fetchCteMdfeDocuments,
  fetchIntegrationStatus,
} from '../services/cteMdfeService';

export interface CTeMdfeSummary {
  total: number;
  averageValue: number;
  typeCount: Record<ElectronicDocType, number>;
  statusCount: Record<ElectronicDocStatus, number>;
}

interface UseCteMdfeReturn {
  documents: ElectronicDocument[];
  summary: CTeMdfeSummary;
  alerts: ComplianceAlert[];
  integrationHealth: IntegrationStatus;
  pendingDocuments: ElectronicDocument[];
  refresh: () => void;
  createDraft: (payload: CreateDraftPayload) => void;
}

const useCteMdfe = (): UseCteMdfeReturn => {
  const [documents, setDocuments] = useState<ElectronicDocument[]>(() => fetchCteMdfeDocuments());
  const [integrationHealth, setIntegrationHealth] = useState<IntegrationStatus>(() => fetchIntegrationStatus());
  const alerts = useMemo(() => fetchComplianceAlerts(), []);

  const summary = useMemo<CTeMdfeSummary>(() => {
    const typeCount: Record<ElectronicDocType, number> = { 'CT-e': 0, 'MDF-e': 0 };
    const statusCount: Record<ElectronicDocStatus, number> = {
      rascunho: 0,
      em_transmissao: 0,
      autorizado: 0,
      rejeitado: 0,
      cancelado: 0,
    };

    const totalValue = documents.reduce((acc, doc) => {
      typeCount[doc.type] += 1;
      statusCount[doc.status] += 1;
      return acc + doc.totalValue;
    }, 0);

    return {
      total: documents.length,
      averageValue: documents.length ? totalValue / documents.length : 0,
      typeCount,
      statusCount,
    };
  }, [documents]);

  const pendingDocuments = useMemo(
    () => documents.filter((doc) => doc.status !== 'autorizado' && doc.status !== 'cancelado'),
    [documents],
  );

  const refresh = useCallback(() => {
    setDocuments(fetchCteMdfeDocuments());
    setIntegrationHealth(fetchIntegrationStatus());
  }, []);

  const createDraft = useCallback((payload: CreateDraftPayload) => {
    setDocuments((prev) => [createDraftDocument(payload), ...prev]);
  }, []);

  return {
    documents,
    summary,
    alerts,
    integrationHealth,
    pendingDocuments,
    refresh,
    createDraft,
  };
};

export default useCteMdfe;
