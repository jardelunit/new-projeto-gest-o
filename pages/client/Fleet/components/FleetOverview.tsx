// # Contexto: painel resumido da frota.
// # Responsabilidades: mostrar KPIs, custos recentes e alertas de manutenção/documentos.

import React from 'react';
import { FileText, Truck, Activity, Wrench, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Card, KPICard, Button } from '../../../../components/ui/Common';
import { Vehicle } from '../../../../types';

type FleetOverviewProps = {
  vehicles: Vehicle[];
};

const FleetOverview: React.FC<FleetOverviewProps> = ({ vehicles }) => {
  const totalVehicles = vehicles.length;
  const available = vehicles.filter((vehicle) => vehicle.status === 'Disponível').length;
  const inMaintenance = vehicles.filter((vehicle) => vehicle.status === 'Manutenção').length;

  const costData = [
    { name: 'Jan', value: 4500 },
    { name: 'Fev', value: 3200 },
    { name: 'Mar', value: 6800 },
    { name: 'Abr', value: 5100 },
    { name: 'Mai', value: 4200 },
    { name: 'Jun', value: 7500 },
  ];

  const alerts = [
    { type: 'doc', title: 'IPVA Vencido', desc: 'Veículo XYZ-9876', urgency: 'high' },
    { type: 'maint', title: 'Troca de Óleo', desc: 'ABC-1234 (Vence em 500km)', urgency: 'medium' },
    { type: 'doc', title: 'Licenciamento', desc: 'DEF-5678 (Vence em 15 dias)', urgency: 'medium' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total da Frota"
          value={totalVehicles}
          icon={<Truck />}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/70"
        />
        <KPICard
          title="Disponibilidade"
          value={`${totalVehicles ? ((available / totalVehicles) * 100).toFixed(0) : 0}%`}
          change={2}
          icon={<Activity />}
          className="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30"
        />
        <KPICard
          title="Em Manutenção"
          value={inMaintenance}
          change={-1}
          icon={<Wrench />}
          className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30"
        />
        <KPICard
          title="Idade Média"
          value="3.5 Anos"
          icon={<Calendar />}
          className="bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 border-blue-500/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Status Operacional em Tempo Real" className="lg:col-span-2 bg-slate-900/80 backdrop-blur border-slate-700/70">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center h-full pb-4">
            <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-lg border border-slate-800">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                <div
                  className="absolute inset-0 border-4 border-emerald-500 rounded-full"
                  style={{ clipPath: `inset(0 0 ${totalVehicles ? 100 - (available / totalVehicles) * 100 : 100}% 0)` }}
                ></div>
                <span className="text-3xl font-bold text-white">
                  {available}/{totalVehicles}
                </span>
              </div>
              <span className="mt-2 text-sm text-slate-400">Veículos Ativos</span>
            </div>
            <div className="col-span-2 space-y-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-4">Custos Operacionais (Últimos 6 meses)</h4>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Ações Necessárias" className="bg-slate-900/80 backdrop-blur border-slate-700/70">
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-start p-3 rounded-lg border ${
                  alert.urgency === 'high' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'
                }`}
              >
                <div className={`mt-1 mr-3 ${alert.urgency === 'high' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {alert.type === 'doc' ? <FileText size={18} /> : <Wrench size={18} />}
                </div>
                <div>
                  <p className={`font-bold text-sm ${alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'}`}>{alert.title}</p>
                  <p className="text-slate-400 text-xs">{alert.desc}</p>
                </div>
                <Button variant="ghost" className="ml-auto text-xs h-6 px-2">
                  Resolver
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-slate-400 hover:text-white mt-2">
              Ver todos os alertas
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FleetOverview;
