// # Contexto: visão geral de motoristas.
// # Responsabilidades: exibir KPIs rápidos, alertas de CNH, multas recentes e motoristas em rota.

import React from 'react';
import { FileWarning, MapPin, ShieldCheck, Users, Truck, Phone } from 'lucide-react';
import { Button, Card, DataTable, KPICard } from '../../../../components/ui/Common';
import { Driver, Fine, Freight } from '../../../../types';
import { getCNHStatus } from '../utils/validators';
import { DriverQuickCounts } from '../hooks/useDrivers';

type DriverOverviewProps = {
    drivers: Driver[];
    fines: Fine[];
    freights: Freight[];
    quickCounts: DriverQuickCounts;
    onSelectDriver: (driver: Driver) => void;
};

const DriverOverview: React.FC<DriverOverviewProps> = ({ drivers, fines, freights, quickCounts, onSelectDriver }) => {
    const cnhAlerts = drivers
        .map(driver => ({ driver, status: getCNHStatus(driver.cnhExpiry) }))
        .filter(item => item.status.label !== 'Válida')
        .sort(
            (a, b) =>
                new Date(a.driver.cnhExpiry).getTime() - new Date(b.driver.cnhExpiry).getTime(),
        )
        .slice(0, 4);

    const recentFines = [...fines]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    const activeRoutes = freights.filter(freight => freight.driverId && freight.status !== 'Cancelado').slice(0, 4);

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KPICard
                    title="Motoristas Ativos"
                    value={`${quickCounts.active}/${quickCounts.total}`}
                    change={quickCounts.onLeave * -1}
                    icon={<Users />}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/70"
                />
                <KPICard
                    title="CNH a Vencer/Vencidas"
                    value={quickCounts.expiring}
                    icon={<ShieldCheck />}
                    className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30"
                />
                <KPICard
                    title="Multas Pendentes"
                    value={quickCounts.pendingFines}
                    icon={<FileWarning />}
                    className="bg-gradient-to-br from-red-500/10 via-slate-900 to-slate-900 border-red-500/30"
                />
                <KPICard
                    title="Motoristas em Rota"
                    value={quickCounts.onRoute}
                    icon={<MapPin />}
                    className="bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 border-blue-500/30"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="CNH com Atenção" className="lg:col-span-2 bg-slate-900/80 backdrop-blur border-slate-700/70">
                    <div className="space-y-3">
                        {cnhAlerts.length === 0 && <p className="text-slate-400 text-sm">Nenhuma CNH em risco.</p>}
                        {cnhAlerts.map(({ driver, status }) => (
                            <div
                                key={driver.id}
                                className={`flex items-center p-3 rounded-lg border ${
                                    status.label === 'Vencida'
                                        ? 'bg-red-500/10 border-red-500/20'
                                        : 'bg-amber-500/10 border-amber-500/20'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-200 mr-3">
                                    {driver.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">{driver.name}</p>
                                    <p className="text-slate-300 text-sm">Validade: {new Date(driver.cnhExpiry).toLocaleDateString()}</p>
                                    <span className={`text-xs px-2 py-1 rounded border ${status.color}`}>{status.label}</span>
                                </div>
                                <Button variant="ghost" className="text-xs" onClick={() => onSelectDriver(driver)}>
                                    Ver motorista
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Motoristas em Rota" className="bg-slate-900/80 backdrop-blur border-slate-700/70">
                    <div className="space-y-3">
                        {activeRoutes.length === 0 && (
                            <p className="text-slate-400 text-sm">Nenhum motorista em rota no momento.</p>
                        )}
                        {activeRoutes.map(route => {
                            const driver = drivers.find(d => d.id === route.driverId);
                            return (
                                <div key={route.id} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded text-blue-400">
                                        <Truck size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-semibold text-sm">
                                            {route.origin} <span className="text-slate-500">→</span> {route.destination}
                                        </p>
                                        <p className="text-slate-400 text-xs">Status: {route.status}</p>
                                        {driver && (
                                            <button
                                                className="text-blue-400 text-xs mt-1 flex items-center gap-1 hover:underline"
                                                onClick={() => onSelectDriver(driver)}
                                            >
                                                <Phone size={12} /> {driver.name}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            <Card title="Multas Recentes" className="bg-slate-900/80 backdrop-blur border-slate-700/70">
                <DataTable
                    data={recentFines}
                    keyField="id"
                    columns={[
                        { header: 'Data', accessor: 'date' as keyof Fine },
                        { header: 'Infração', accessor: 'description' as keyof Fine },
                        { header: 'Pontos', accessor: (row: Fine) => <span className="font-semibold">{row.points}</span> },
                        { header: 'Valor', accessor: (row: Fine) => `R$ ${row.amount.toFixed(2)}` },
                        {
                            header: 'Status',
                            accessor: (row: Fine) => (
                                <span
                                    className={`px-2 py-1 rounded text-xs ${
                                        row.status === 'Paga'
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-red-500/20 text-red-400'
                                    }`}
                                >
                                    {row.status}
                                </span>
                            ),
                        },
                    ]}
                />
            </Card>
        </div>
    );
};

export default DriverOverview;
