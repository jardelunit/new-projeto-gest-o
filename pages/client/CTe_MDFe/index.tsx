// # Contexto: módulo de CT-e/MDF-e do cliente.
// # Responsabilidades: orquestrar resumo, listagem, pendências e consulta com filtros, além de abrir modal de rascunho.

import React, { useState } from 'react';
import { Plus, RefreshCw, FileText } from 'lucide-react';
import { Button, Card } from '../../../components/ui/Common';
import DocumentSummary from './components/DocumentSummary';
import DocumentTable from './components/DocumentTable';
import CompliancePanel from './components/CompliancePanel';
import DocumentModal from './modals/DocumentModal';
import useCteMdfe from './hooks/useCteMdfe';
import DocumentSearch from './components/DocumentSearch';

const CTeMDFeModule: React.FC = () => {
  const { documents, summary, alerts, integrationHealth, pendingDocuments, refresh, createDraft } = useCteMdfe();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'painel' | 'consulta'>('painel');

  const handleCreateDraft = (payload: Parameters<typeof createDraft>[0]) => {
    createDraft(payload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-blue-300 flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30">
              <FileText size={18} />
            </span>
            Gestão centralizada de CT-e e MDF-e, da emissão ao acompanhamento de eventos.
          </p>
          <h1 className="text-2xl font-bold text-white mt-1">CT-e / MDF-e</h1>
          <p className="text-slate-400">Monitore autorizações, pendências e saúde das integrações com a SEFAZ.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={refresh}>
            <RefreshCw size={16} className="mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Novo documento
          </Button>
        </div>
      </div>

      <DocumentSummary summary={summary} integrationHealth={integrationHealth} />

      <div className="flex overflow-x-auto gap-2 bg-slate-900/60 rounded-lg p-1 border border-slate-800/70">
        {[
          { id: 'painel', label: 'Painel', description: 'Resumo e pendências' },
          { id: 'consulta', label: 'Consulta', description: 'Busca e filtros' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'painel' | 'consulta')}
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-blue-600/20 text-blue-200 border-blue-500/40 shadow-lg shadow-blue-900/30'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className="text-left">
              <p>{tab.label}</p>
              <span className="block text-[11px] text-slate-500">{tab.description}</span>
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'painel' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card title="Painel de documentos">
              <DocumentTable documents={documents} />
            </Card>
          </div>
          <CompliancePanel alerts={alerts} pending={pendingDocuments} />
        </div>
      )}

      {activeTab === 'consulta' && <DocumentSearch documents={documents} onRefresh={refresh} />}

      <DocumentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleCreateDraft} />
    </div>
  );
};

export default CTeMDFeModule;
