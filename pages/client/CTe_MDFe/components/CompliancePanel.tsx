// # Contexto: área de conformidade e pendências de CT-e/MDF-e.
// # Responsabilidades: listar alertas críticos e documentos que exigem ação manual.

import React from 'react';
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { Card } from '../../../../components/ui/Common';
import { ComplianceAlert, ElectronicDocument } from '../services/cteMdfeService';
import { formatDate, statusClasses, statusLabels } from '../utils/formatters';

type CompliancePanelProps = {
  alerts: ComplianceAlert[];
  pending: ElectronicDocument[];
};

const levelTone: Record<ComplianceAlert['level'], string> = {
  info: 'bg-slate-700/60 text-slate-200 border-slate-600',
  warning: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  critical: 'bg-red-500/20 text-red-200 border-red-500/40',
};

const CompliancePanel: React.FC<CompliancePanelProps> = ({ alerts, pending }) => {
  return (
    <div className="space-y-4">
      <Card title="Alertas de Conformidade">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${levelTone[alert.level]} flex items-start gap-3`}
            >
              <div className="mt-0.5">
                <ShieldAlert size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">{alert.message}</p>
                {alert.detail && <p className="text-xs text-slate-400 mt-1">{alert.detail}</p>}
              </div>
            </div>
          ))}
          {alerts.length === 0 && <p className="text-sm text-slate-500">Nenhum alerta no momento.</p>}
        </div>
      </Card>

      <Card title="Pendências e acompanhamentos">
        <div className="space-y-3">
          {pending.slice(0, 4).map((doc) => (
            <div key={doc.id} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{doc.id}</p>
                  <p className="text-xs text-slate-400">{doc.type} - Emitido em {formatDate(doc.issueDate)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[doc.status]}`}>
                  {statusLabels[doc.status]}
                </span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-slate-300">
                <Clock size={14} className="mt-0.5 text-slate-500" />
                <p>{doc.lastEvent}</p>
              </div>
            </div>
          ))}
          {pending.length === 0 && (
            <div className="flex items-center gap-2 text-sm text-emerald-300">
              <AlertTriangle size={16} className="text-emerald-400" />
              Todas as transmissões estão em dia.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CompliancePanel;
