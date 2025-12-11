// # Contexto: serviços mock para CT-e e MDF-e.
// # Responsabilidades: fornecer dados fictícios, alertas de conformidade e status de integração.

export type ElectronicDocType = 'CT-e' | 'MDF-e';
export type ElectronicDocStatus = 'rascunho' | 'em_transmissao' | 'autorizado' | 'rejeitado' | 'cancelado';

export interface ElectronicDocument {
  id: string;
  type: ElectronicDocType;
  status: ElectronicDocStatus;
  issuer: string;
  recipient: string;
  uf: string;
  issueDate: string;
  totalValue: number;
  lastEvent: string;
}

export interface ComplianceAlert {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  detail?: string;
}

export interface IntegrationStatus {
  sefaz: 'online' | 'intermitente' | 'offline';
  lastSync: string;
  certificateValidUntil: string;
}

export interface CreateDraftPayload {
  type: ElectronicDocType;
  issuer: string;
  recipient: string;
  uf: string;
  totalValue: number;
}

export const fetchCteMdfeDocuments = (): ElectronicDocument[] => [
  {
    id: 'CTE-004582',
    type: 'CT-e',
    status: 'autorizado',
    issuer: 'LogiMaster Transporte',
    recipient: 'Mercado Central LTDA',
    uf: 'SP',
    issueDate: '2024-05-09',
    totalValue: 18450,
    lastEvent: 'Autorizado e enviado ao cliente',
  },
  {
    id: 'CTE-004583',
    type: 'CT-e',
    status: 'em_transmissao',
    issuer: 'LogiMaster Transporte',
    recipient: 'Rede Norte Distribuidora',
    uf: 'MG',
    issueDate: '2024-05-10',
    totalValue: 12980,
    lastEvent: 'Transmitindo para SEFAZ/MG',
  },
  {
    id: 'MDF-001902',
    type: 'MDF-e',
    status: 'rascunho',
    issuer: 'LogiMaster Transporte',
    recipient: 'SEFAZ/PR',
    uf: 'PR',
    issueDate: '2024-05-11',
    totalValue: 5200,
    lastEvent: 'Manifesto aguardando transmissão',
  },
  {
    id: 'MDF-001901',
    type: 'MDF-e',
    status: 'rejeitado',
    issuer: 'LogiMaster Transporte',
    recipient: 'SEFAZ/RS',
    uf: 'RS',
    issueDate: '2024-05-08',
    totalValue: 4870,
    lastEvent: 'Rejeitado: RNTRC do veículo vencido',
  },
  {
    id: 'CTE-004579',
    type: 'CT-e',
    status: 'autorizado',
    issuer: 'LogiMaster Transporte',
    recipient: 'Varejo Sul',
    uf: 'SC',
    issueDate: '2024-05-07',
    totalValue: 9400,
    lastEvent: 'Autorizado - aguardando entrega',
  },
];

export const fetchComplianceAlerts = (): ComplianceAlert[] => [
  {
    id: 'alert-1',
    message: '2 MDF-e aguardando encerramento nos últimos 7 dias',
    level: 'warning',
    detail: 'Finalize o encerramento para evitar autuações e bloqueio de emissão.',
  },
  {
    id: 'alert-2',
    message: 'Certificado A1 expira em 25 dias',
    level: 'critical',
    detail: 'Inicie a renovação para não interromper a autorização de documentos.',
  },
  {
    id: 'alert-3',
    message: 'CT-e com erro cadastral pendente de correção',
    level: 'info',
    detail: 'Atualize o RNTRC do veículo e reenvie o documento para a SEFAZ.',
  },
];

export const fetchIntegrationStatus = (): IntegrationStatus => ({
  sefaz: 'online',
  lastSync: new Date().toISOString(),
  certificateValidUntil: '2025-02-10',
});

export const createDraftDocument = (payload: CreateDraftPayload): ElectronicDocument => ({
  id: `DOC-${Math.floor(Math.random() * 9000) + 1000}`,
  type: payload.type,
  status: 'rascunho',
  issuer: payload.issuer,
  recipient: payload.recipient,
  uf: payload.uf,
  issueDate: new Date().toISOString().slice(0, 10),
  totalValue: payload.totalValue,
  lastEvent: 'Rascunho criado no portal',
});
