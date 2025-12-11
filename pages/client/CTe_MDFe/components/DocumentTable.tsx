// # Contexto: listagem principal de CT-e/MDF-e.
// # Responsabilidades: exibir documento, data, destinatário, UF, valor e status com badge.

import React, { useMemo } from 'react';
import { DataTable } from '../../../../components/ui/Common';
import { ElectronicDocument } from '../services/cteMdfeService';
import { formatCurrency, formatDate, statusClasses, statusLabels } from '../utils/formatters';

type DocumentTableProps = {
  documents: ElectronicDocument[];
};

const DocumentTable: React.FC<DocumentTableProps> = ({ documents }) => {
  const columns = useMemo(
    () => [
      {
        header: 'Documento',
        accessor: (row: ElectronicDocument) => (
          <div>
            <p className="text-white font-semibold">{row.id}</p>
            <p className="text-xs text-slate-500">{row.type}</p>
          </div>
        ),
      },
      {
        header: 'Emissão',
        accessor: (row: ElectronicDocument) => <span>{formatDate(row.issueDate)}</span>,
      },
      {
        header: 'Destinatário',
        accessor: (row: ElectronicDocument) => (
          <div>
            <p className="text-white font-medium">{row.recipient}</p>
            <p className="text-xs text-slate-500">Emitente: {row.issuer}</p>
          </div>
        ),
        className: 'min-w-[220px]',
      },
      { header: 'UF', accessor: 'uf' as keyof ElectronicDocument, className: 'uppercase' },
      {
        header: 'Valor',
        accessor: (row: ElectronicDocument) => <span className="font-semibold text-slate-100">{formatCurrency(row.totalValue)}</span>,
      },
      {
        header: 'Status',
        accessor: (row: ElectronicDocument) => (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[row.status]}`}>
            {statusLabels[row.status]}
          </span>
        ),
      },
      {
        header: 'Último evento',
        accessor: (row: ElectronicDocument) => <span className="text-slate-300 text-sm">{row.lastEvent}</span>,
        className: 'min-w-[220px]',
      },
    ],
    [],
  );

  return <DataTable data={documents} columns={columns} keyField="id" />;
};

export default DocumentTable;
