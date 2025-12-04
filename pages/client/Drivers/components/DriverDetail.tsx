// # Contexto: detalhe do motorista.
// # Responsabilidades: agrupar dados pessoais, CNH, veículo atribuído, histórico de viagens, despesas e multas.

import React, { useState } from 'react';
import { User, ArrowLeft, Phone, FileWarning, Save, MapPin, Truck, DollarSign, AlertTriangle } from 'lucide-react';
import { Button, Card, DataTable, Input, Select } from '../../../../components/ui/Common';
import { Driver, Expense, Fine, Freight, Vehicle } from '../../../../types';
import { getCNHStatus } from '../utils/validators';

interface DriverDetailProps {
    driver: Driver;
    vehicle?: Vehicle;
    freights: Freight[];
    expenses: Expense[];
    fines: Fine[];
    onBack: () => void;
    onOpenFineModal: () => void;
}

const DriverDetail: React.FC<DriverDetailProps> = ({ driver, vehicle, freights, expenses, fines, onBack, onOpenFineModal }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'trips' | 'fines'>('info');
    const cnhStatus = getCNHStatus(driver.cnhExpiry);

    return (
        <div className="space-y-6">
             {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={onBack} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300">
                        {driver.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{driver.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs border ${cnhStatus.color}`}>
                                CNH {cnhStatus.label}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center">
                                <Phone size={12} className="mr-1" /> {driver.phone}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="secondary" onClick={onOpenFineModal}>
                        <FileWarning size={16} className="mr-2" /> Registrar Multa
                    </Button>
                    <Button>
                        <Save size={16} className="mr-2" /> Salvar
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
                {[
                    { id: 'info', label: 'Dados Gerais', icon: <User size={18} /> },
                    { id: 'trips', label: 'Histórico de Viagens', icon: <MapPin size={18} /> },
                    { id: 'fines', label: 'Multas & Pontos', icon: <FileWarning size={18} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === tab.id 
                            ? 'border-blue-500 text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {/* TAB: INFO */}
                {activeTab === 'info' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Informações Pessoais">
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Nome Completo" defaultValue={driver.name} />
                                <Input label="Telefone" defaultValue={driver.phone} />
                                <Input label="CPF" placeholder="000.000.000-00" />
                                <Input label="RG" placeholder="00.000.000-0" />
                                <div className="col-span-2">
                                    <Input label="Endereço" placeholder="Rua..." />
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card title="Dados da CNH">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Número CNH" defaultValue={driver.cnh} />
                                    <Select label="Categoria" options={[{value:'C',label:'C'},{value:'D',label:'D'},{value:'E',label:'E'}]} defaultValue={driver.cnhCategory} />
                                    <Input label="Validade" type="date" defaultValue={driver.cnhExpiry} 
                                        className={cnhStatus.label !== 'Válida' && cnhStatus.label !== 'Vencida' ? 'border-yellow-500 text-yellow-500' : cnhStatus.label === 'Vencida' ? 'border-red-500 text-red-500' : ''}
                                    />
                                    {cnhStatus.label !== 'Válida' && (
                                        <div className="col-span-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm flex items-center">
                                            <AlertTriangle size={16} className="mr-2" />
                                            Atenção: A CNH deste motorista está {cnhStatus.label.toLowerCase()}.
                                        </div>
                                    )}
                                </div>
                            </Card>

                            <Card title="Veículo Atribuído">
                                {vehicle ? (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white text-lg">{vehicle.plate}</p>
                                            <p className="text-slate-400">{vehicle.model}</p>
                                        </div>
                                        <Button variant="secondary" className="text-xs">Trocar</Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-slate-400 mb-2">Nenhum veículo atribuído.</p>
                                        <Button variant="secondary" className="w-full">
                                            <Truck size={16} className="mr-2" /> Atribuir Veículo
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                )}

                {/* TAB: TRIPS */}
                {activeTab === 'trips' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Card className="bg-blue-900/10 border-blue-500/20">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-500/20 rounded-lg mr-4 text-blue-400"><Truck /></div>
                                    <div>
                                        <p className="text-slate-400 text-sm">Total de Viagens</p>
                                        <h3 className="text-2xl font-bold text-white">{freights.length}</h3>
                                    </div>
                                </div>
                             </Card>
                             <Card className="bg-emerald-900/10 border-emerald-500/20">
                                <div className="flex items-center">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4 text-emerald-400"><DollarSign /></div>
                                    <div>
                                        <p className="text-slate-400 text-sm">Gastos em Viagem</p>
                                        <h3 className="text-2xl font-bold text-white">
                                            R$ {expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                             </Card>
                        </div>

                        <h3 className="text-lg font-bold text-white">Histórico de Fretes</h3>
                        <DataTable 
                            data={freights}
                            columns={[
                                { header: 'Data', accessor: 'date' as keyof Freight },
                                { header: 'Origem', accessor: 'origin' as keyof Freight },
                                { header: 'Destino', accessor: 'destination' as keyof Freight },
                                { header: 'Status', accessor: 'status' as keyof Freight },
                                { header: 'Valor', accessor: (row: Freight) => `R$ ${row.value}` }
                            ]}
                            keyField="id"
                        />

                        <h3 className="text-lg font-bold text-white mt-8">Despesas Vinculadas</h3>
                        <DataTable 
                            data={expenses}
                            columns={[
                                { header: 'Data', accessor: 'date' as keyof Expense },
                                { header: 'Categoria', accessor: 'category' as keyof Expense },
                                { header: 'Descrição', accessor: 'description' as keyof Expense },
                                { header: 'Valor', accessor: (row: Expense) => `R$ ${row.amount.toFixed(2)}` }
                            ]}
                            keyField="id"
                        />
                    </div>
                )}

                {/* TAB: FINES */}
                {activeTab === 'fines' && (
                    <div className="space-y-6">
                         <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <div>
                                <p className="text-slate-400 text-sm">Total de Pontos (12 meses)</p>
                                <h3 className={`text-3xl font-bold ${fines.reduce((a,b)=>a+b.points,0) > 20 ? 'text-red-500' : 'text-white'}`}>
                                    {fines.reduce((a,b) => a + b.points, 0)} pts
                                </h3>
                            </div>
                            <Button variant="danger" onClick={onOpenFineModal}>
                                + Nova Multa
                            </Button>
                         </div>

                         <DataTable 
                            data={fines}
                            columns={[
                                { header: 'Data', accessor: 'date' as keyof Fine },
                                { header: 'Infração', accessor: 'description' as keyof Fine, className: 'text-white' },
                                { header: 'Pontos', accessor: (row: Fine) => <span className="font-bold">{row.points}</span> },
                                { header: 'Valor', accessor: (row: Fine) => `R$ ${row.amount.toFixed(2)}` },
                                { 
                                    header: 'Status', 
                                    accessor: (row: Fine) => (
                                        <span className={`px-2 py-1 rounded text-xs ${row.status === 'Paga' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {row.status}
                                        </span>
                                    )
                                }
                            ]}
                            keyField="id"
                         />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverDetail;
