// # Contexto: tabela resumida de fretes recentes.
// # Responsabilidades: listar fretes e oferecer link para ver todos.

import React from 'react';
import { Button, DataTable } from '../../../../components/ui/Common';
import { Freight } from '../../../../types';
import { FreightColumn } from '../hooks/useOverview';

type RecentFreightsProps = {
  freights: Freight[];
  columns: FreightColumn[];
};

const RecentFreights: React.FC<RecentFreightsProps> = ({ freights, columns }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-white">Fretes Recentes</h2>
      <Button variant="ghost" className="text-sm" type="button">
        Ver Todos
      </Button>
    </div>
    <DataTable data={freights} columns={columns} keyField="id" />
  </div>
);

export default RecentFreights;
