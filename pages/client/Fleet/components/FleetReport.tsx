// # Contexto: relatório consolidado ou detalhado por veículo.
// # Responsabilidades: sumarizar custos/km por veículo e abrir visão aprofundada com gráficos e timeline.

import React from 'react';
import { ArrowLeft, AlertTriangle, Activity, BarChart3, Clock, DollarSign, Download, FileText, Wrench } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePie, Pie, Cell, Tooltip } from 'recharts';
import { Button, Card, DataTable, KPICard } from '../../../../components/ui/Common';
import { FleetSummary, VehicleSnapshot } from '../hooks/useFleet';
import { formatCurrency, formatDate, formatKilometers } from '../utils/formatters';

type FleetReportProps = {
  fleetSummary: FleetSummary[];
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicleId: string | null) => void;
  getVehicleSnapshot: (vehicleId: string) => VehicleSnapshot | null;
};

const COLORS = ['#ef4444', '#3b82f6', '#10b981'];

const FleetReport: React.FC<FleetReportProps> = ({ fleetSummary, selectedVehicleId, onSelectVehicle, getVehicleSnapshot }) => {
  if (!selectedVehicleId) {
    const totalFleetCost = fleetSummary.reduce((acc, item) => acc + item.totalCost, 0);
    const highestCostVehicle = fleetSummary.reduce<FleetSummary | null>(
      (highest, current) => (!highest || current.totalCost > highest.totalCost ? current : highest),
      null,
    );
    const averageCostPerKm =
      fleetSummary.length > 0 ? fleetSummary.reduce((acc, item) => acc + item.costPerKm, 0) / fleetSummary.length : 0;

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-2">Relatório Consolidado da Frota</h2>
          <p className="text-slate-400 mb-6">Selecione um veículo para ver o dossiê completo de custos, manutenções e histórico.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <KPICard
              title="Custo Total da Frota"
              value={formatCurrency(totalFleetCost, { minimumFractionDigits: 0 })}
              icon={<DollarSign />}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/70"
            />
            <KPICard
              title="Veículo de Maior Custo"
              value={highestCostVehicle ? highestCostVehicle.model : '—'}
              icon={<AlertTriangle />}
              className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30"
            />
            <KPICard
              title="Média Custo/KM"
              value={formatCurrency(averageCostPerKm)}
              icon={<Activity />}
              className="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30"
            />
          </div>

          <h3 className="font-bold text-white mb-4">Eficiência por Veículo</h3>
          <DataTable
            data={fleetSummary}
            keyField="id"
            columns={[
              { header: 'Placa', accessor: 'plate', className: 'font-bold text-white' },
              { header: 'Modelo', accessor: 'model' },
              { header: 'KM Rodados', accessor: (row: FleetSummary) => formatKilometers(row.currentKm) },
              { header: 'Custo Total', accessor: (row: FleetSummary) => formatCurrency(row.totalCost, { minimumFractionDigits: 0 }) },
              { header: 'Manutenções', accessor: 'maintCount' },
              {
                header: 'Custo Est. / KM',
                accessor: (row: FleetSummary) => (
                  <span className={row.costPerKm > 3 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {formatCurrency(row.costPerKm)}
                  </span>
                ),
              },
              {
                header: 'Ação',
                accessor: (row: FleetSummary) => (
                  <Button
                    variant="ghost"
                    onClick={() => onSelectVehicle(row.id)}
                    className="text-blue-400 hover:text-white"
                  >
                    Ver Relatório Completo
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    );
  }

  const snapshot = getVehicleSnapshot(selectedVehicleId);
  if (!snapshot) {
    onSelectVehicle(null);
    return null;
  }

  const { vehicle } = snapshot;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => onSelectVehicle(null)}>
          <ArrowLeft size={18} className="mr-2" /> Voltar para Lista
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            Dossiê do Veículo: <span className="text-blue-400 ml-2">{vehicle.plate}</span>
          </h2>
          <p className="text-slate-400">
            {vehicle.model} • {vehicle.year}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost">
            <Download size={18} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 p-4 border-l-4 border-l-blue-500 border-blue-500/40">
              <p className="text-slate-400 text-sm">Custo Total Acumulado</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(snapshot.grandTotal, { minimumFractionDigits: 0 })}</h3>
            </Card>
            <Card className="bg-gradient-to-br from-rose-500/10 via-slate-900 to-slate-900 p-4 border-l-4 border-l-red-500 border-red-500/40">
              <p className="text-slate-400 text-sm">Gasto em Manutenção</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(snapshot.maintTotal, { minimumFractionDigits: 0 })}</h3>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 p-4 border-l-4 border-l-emerald-500 border-emerald-500/40">
              <p className="text-slate-400 text-sm">KM Atual</p>
              <h3 className="text-2xl font-bold text-white">{vehicle.currentKm.toLocaleString()}</h3>
            </Card>
          </div>

          <Card title="Composição de Custos">
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePie>
                  <Pie data={snapshot.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {snapshot.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                </RePie>
              </ResponsiveContainer>
              <div className="ml-8 space-y-2">
                {snapshot.pieData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-slate-300 text-sm">
                      {item.name}: {formatCurrency(item.value, { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <h3 className="font-bold text-white mt-4">Documentação e Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snapshot.documents.map((doc) => (
              <div key={doc.id} className="bg-slate-800 p-3 rounded border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">{doc.title}</p>
                  <p className="text-xs text-slate-500">Vence: {formatDate(doc.expiryDate)}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    doc.status === 'Válido' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 overflow-hidden flex flex-col h-full">
          <h3 className="font-bold text-white mb-6 flex items-center">
            <Clock size={18} className="mr-2" /> Linha do Tempo
          </h3>
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {snapshot.timeline.length === 0 ? (
              <p className="text-slate-500 text-center italic">Nenhum evento registrado.</p>
            ) : (
              snapshot.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-700 last:border-0 pb-1">
                  <div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-slate-800 ${
                      event.type === 'Manutenção'
                        ? 'bg-red-500'
                        : event.type === 'Despesa'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  ></div>
                  <div className="mb-1 flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-500">{formatDate(event.date)}</span>
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        event.type === 'Manutenção'
                          ? 'bg-red-500/20 text-red-400'
                          : event.type === 'Despesa'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 font-medium">{event.desc}</p>
                  {event.val > 0 && <p className="text-xs text-slate-400 mt-0.5">{formatCurrency(event.val, { minimumFractionDigits: 0 })}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetReport;
