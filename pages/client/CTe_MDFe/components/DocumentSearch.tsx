// # Contexto: aba de consulta de CT-e/MDF-e.
// # Responsabilidades: aplicar filtros (busca, tipo, status, UF) e exibir resultados em tabela.

import React, { useMemo, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { Button, Card, Input, Select } from '../../../../components/ui/Common';
import DocumentTable from './DocumentTable';
import { ElectronicDocument } from '../services/cteMdfeService';
import { statusLabels } from '../utils/formatters';

type DocumentSearchProps = {
  documents: ElectronicDocument[];
  onRefresh: () => void;
};

const DocumentSearch: React.FC<DocumentSearchProps> = ({ documents, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'CT-e' | 'MDF-e'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ElectronicDocument['status']>('all');
  const [ufFilter, setUfFilter] = useState<'all' | string>('all');

  const ufOptions = useMemo(
    () => Array.from(new Set(documents.map((doc) => doc.uf))).sort(),
    [documents],
  );

  const filteredDocuments = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return documents
      .filter((doc) => {
        const matchesTerm =
          !term ||
          doc.id.toLowerCase().includes(term) ||
          doc.recipient.toLowerCase().includes(term) ||
          doc.issuer.toLowerCase().includes(term);
        const matchesType = typeFilter === 'all' || doc.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
        const matchesUf = ufFilter === 'all' || doc.uf === ufFilter;
        return matchesTerm && matchesType && matchesStatus && matchesUf;
      })
      .sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [documents, searchTerm, statusFilter, typeFilter, ufFilter]);

  return (
    <Card title="Consulta de documentos">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Busca"
            placeholder="ID, destinatário ou emitente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            label="Tipo"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            options={[
              { value: 'all', label: 'Todos' },
              { value: 'CT-e', label: 'CT-e' },
              { value: 'MDF-e', label: 'MDF-e' },
            ]}
          />
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            options={[
              { value: 'all', label: 'Todos' },
              ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
            ]}
          />
          <Select
            label="UF"
            value={ufFilter}
            onChange={(e) => setUfFilter(e.target.value as typeof ufFilter)}
            options={[{ value: 'all', label: 'Todas' }, ...ufOptions.map((uf) => ({ value: uf, label: uf }))]}
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Search size={14} className="text-slate-500" />
            {filteredDocuments.length} documentos encontrados
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => onRefresh()}>
              <RefreshCw size={16} className="mr-2" />
              Atualizar dados
            </Button>
          </div>
        </div>

        <DocumentTable documents={filteredDocuments} />

        {filteredDocuments.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum documento corresponde aos filtros selecionados.</p>
        )}
      </div>
    </Card>
  );
};

export default DocumentSearch;
