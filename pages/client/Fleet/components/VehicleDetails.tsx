// # Contexto: dossiê do veículo selecionado.
// # Responsabilidades: apresentar KPIs, históricos de manutenção/documentos/despesas e ações de exportação.

import React from 'react';
import { ArrowLeft, Download, DollarSign, Wrench, Activity } from 'lucide-react';
import { Button, Card, DataTable, Input, KPICard } from '../../../../components/ui/Common';
import { Vehicle } from '../../../../types';
import { VehicleSnapshot } from '../hooks/useFleet';
import { formatCurrency, formatDate, formatKilometers } from '../utils/formatters';

type VehicleDetailsProps = {
  snapshot: VehicleSnapshot;
  statusTone: Record<Vehicle['status'], string>;
  onBack: () => void;
};

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ snapshot, statusTone, onBack }) => {
  const maintColumns = [
    { header: 'Data', accessor: (row: VehicleSnapshot['maintenances'][number]) => formatDate(row.date) },
    { header: 'Serviço', accessor: 'description' as const },
    { header: 'Tipo', accessor: 'type' as const },
    {
      header: 'Custo',
      accessor: (row: VehicleSnapshot['maintenances'][number]) => formatCurrency(row.cost),
    },
    { header: 'Status', accessor: 'status' as const },
  ];

  const docColumns = [
    { header: 'Documento', accessor: 'title' as const },
    { header: 'Tipo', accessor: 'type' as const },
    { header: 'Vencimento', accessor: (row: VehicleSnapshot['documents'][number]) => formatDate(row.expiryDate) },
    {
      header: 'Status',
      accessor: (row: VehicleSnapshot['documents'][number]) => (
        <span
          className={`text-xs font-bold ${
            row.status === 'Vencido' ? 'text-red-400' : row.status === 'A Vencer' ? 'text-yellow-400' : 'text-emerald-400'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const expenseColumns = [
    { header: 'Descrição', accessor: 'description' as const },
    { header: 'Categoria', accessor: 'category' as const },
    { header: 'Data', accessor: (row: VehicleSnapshot['expenses'][number]) => formatDate(row.date) },
    {
      header: 'Valor',
      accessor: (row: VehicleSnapshot['expenses'][number]) => (
        <span className="text-red-400 font-medium">- {formatCurrency(row.amount)}</span>
      ),
    },
  ];

  const { vehicle } = snapshot;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 bg-slate-900/70 backdrop-blur border border-slate-800/70 rounded-lg p-4 shadow-lg shadow-slate-900/40">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {vehicle.model} <span className="text-slate-400 font-normal">({vehicle.plate})</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${statusTone[vehicle.status]}`}>{vehicle.status}</span>
          </h2>
          <p className="text-slate-400 text-sm">Ano {vehicle.year} • Motorista: {vehicle.driverId || '—'}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="secondary">Editar Cadastro</Button>
          <Button variant="ghost">
            <Download size={16} className="mr-1" /> Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Custo Total"
          value={formatCurrency(snapshot.grandTotal, { minimumFractionDigits: 0 })}
          icon={<DollarSign />}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/70"
        />
        <KPICard
          title="Manutenções"
          value={snapshot.maintenances.length}
          icon={<Wrench />}
          className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30"
        />
        <KPICard
          title="Km Atual"
          value={formatKilometers(vehicle.currentKm)}
          icon={<Activity />}
          className="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Resumo Operacional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded border border-slate-800">
                <p className="text-xs text-slate-400">Próxima Revisão</p>
                <p className="text-lg text-white mt-1">{vehicle.lastMaintenance}</p>
                <p className="text-xs text-slate-500">Última manutenção registrada</p>
              </div>
              <div className="p-4 bg-slate-900 rounded border border-slate-800">
                <p className="text-xs text-slate-400">Documento</p>
                <p className="text-lg text-white mt-1">{snapshot.upcomingDoc ? snapshot.upcomingDoc.title : 'Sem documentos'}</p>
                <p className="text-xs text-slate-500">
                  {snapshot.upcomingDoc ? `Vence em ${snapshot.upcomingDoc.expiryDate}` : 'Cadastre um documento'}
                </p>
              </div>
            </div>
          </Card>

          <Card title="Histórico de Manutenções">
            <DataTable data={snapshot.maintenances} columns={maintColumns} keyField="id" />
            {snapshot.maintenances.length === 0 && <p className="text-slate-500 text-sm mt-4">Nenhuma manutenção registrada.</p>}
          </Card>

          <Card title="Despesas do Veículo">
            <DataTable data={snapshot.expenses} columns={expenseColumns} keyField="id" />
            {snapshot.expenses.length === 0 && <p className="text-slate-500 text-sm mt-4">Nenhuma despesa lançada.</p>}
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Documentos">
            <DataTable data={snapshot.documents} columns={docColumns} keyField="id" />
            {snapshot.documents.length === 0 && <p className="text-slate-500 text-sm mt-4">Nenhum documento vinculado.</p>}
          </Card>
          <Card title="Anotações Rápidas">
            <p className="text-slate-400 text-sm">Use esta seção para registrar pendências ou observações internas.</p>
            <div className="mt-3 space-y-2">
              <Input placeholder="Trocar pneus em 10.000km" />
              <Button className="w-full">Salvar anotação</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
