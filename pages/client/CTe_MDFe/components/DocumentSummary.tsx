// # Contexto: resumo rápido do módulo de CT-e/MDF-e.
// # Responsabilidades: exibir KPIs principais e saúde das integrações SEFAZ/certificado.

import React, { useMemo } from 'react';
import { AlertTriangle, FileBadge2, FileCheck2, FileStack, RefreshCw, ShieldCheck } from 'lucide-react';
import { Card, KPICard } from '../../../../components/ui/Common';
import { formatCurrency } from '../utils/formatters';
import { CTeMdfeSummary } from '../hooks/useCteMdfe';
import { IntegrationStatus } from '../services/cteMdfeService';

type DocumentSummaryProps = {
  summary: CTeMdfeSummary;
  integrationHealth: IntegrationStatus;
};

const DocumentSummary: React.FC<DocumentSummaryProps> = ({ summary, integrationHealth }) => {
  const pendingTotal =
    summary.statusCount.em_transmissao + summary.statusCount.rascunho + summary.statusCount.rejeitado;

  const integrationTone = useMemo(() => {
    if (integrationHealth.sefaz === 'online') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (integrationHealth.sefaz === 'intermitente') return 'text-amber-300 bg-amber-500/10 border-amber-500/30';
    return 'text-red-300 bg-red-500/10 border-red-500/30';
  }, [integrationHealth.sefaz]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="CT-e ativos" value={summary.typeCount['CT-e']} icon={<FileBadge2 />} />
        <KPICard title="MDF-e ativos" value={summary.typeCount['MDF-e']} icon={<FileStack />} />
        <KPICard title="Autorizados" value={summary.statusCount.autorizado} icon={<FileCheck2 />} />
        <KPICard title="Pendências" value={pendingTotal} icon={<AlertTriangle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Ticket médio</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(summary.averageValue || 0)}</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 text-blue-400">
              <FileCheck2 size={20} />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Calculado sobre os documentos emitidos no período carregado.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Status SEFAZ</p>
              <p className="text-xl font-bold text-white capitalize">{integrationHealth.sefaz}</p>
              <p className="text-sm text-slate-500 mt-1">
                Última sincronização {new Date(integrationHealth.lastSync).toLocaleString('pt-BR')}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide ${integrationTone}`}
            >
              Sefaz
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Certificado A1</p>
              <p className="text-xl font-bold text-white">
                Válido até {new Date(integrationHealth.certificateValidUntil).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-slate-500 mt-1">Acompanhe o prazo para evitar bloqueios.</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck size={20} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-slate-900/40 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Sincronização automática</p>
            <p className="text-lg text-white font-semibold">Monitorando eventos e protocolos</p>
            <p className="text-sm text-slate-500">Atualizamos os eventos de CT-e/MDF-e periodicamente.</p>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <RefreshCw size={16} />
            Atualizações contínuas
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentSummary;
