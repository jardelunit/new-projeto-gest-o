// # Contexto: detalhamento de um frete.
// # Responsabilidades: mostrar abas de informações/logística e financeiro, permitindo alterar status e despesas.

import React, { useEffect, useState } from 'react';
import { Button, Card, DataTable, KPICard } from '../../../../components/ui/Common';
import { Driver, Expense, Freight, Vehicle } from '../../../../types';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Download,
  FileDown,
  FileText,
  Package,
  Play,
  Plus,
  Receipt,
  ShieldCheck,
  Truck,
  User,
  XCircle,
} from 'lucide-react';
import { formatCurrency, getFiscalStatusColor, getStatusColor } from '../utils/formatters';

interface FreightDetailProps {
  freight: Freight;
  driver?: Driver;
  vehicle?: Vehicle;
  expenses: Expense[];
  onBack: () => void;
  onUpdateStatus: (id: string, newStatus: Freight['status']) => void;
  onAddExpense: () => void;
}

const FreightDetail: React.FC<FreightDetailProps> = ({
  freight,
  driver,
  vehicle,
  expenses: initialExpenses,
  onBack,
  onUpdateStatus,
  onAddExpense,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'financial' | 'fiscal'>('info');
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = freight.value - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Frete #{freight.id.toUpperCase()}
            </h1>
            <span className={`mt-1 inline-block px-2 py-0.5 rounded text-xs border ${getStatusColor(freight.status)}`}>
              {freight.status}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {freight.status === 'Pendente' && (
            <Button variant="primary" onClick={() => onUpdateStatus(freight.id, 'Em Progresso')}>
              <Play size={16} className="mr-2" /> Iniciar Viagem
            </Button>
          )}
          {freight.status === 'Em Progresso' && (
            <Button variant="success" onClick={() => onUpdateStatus(freight.id, 'Entregue')}>
              <CheckCircle size={16} className="mr-2" /> Concluir Entrega
            </Button>
          )}
          {freight.status !== 'Entregue' && freight.status !== 'Cancelado' && (
            <Button
              variant="danger"
              className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={() => onUpdateStatus(freight.id, 'Cancelado')}
            >
              <XCircle size={16} className="mr-2" /> Cancelar
            </Button>
          )}
        </div>
      </div>

      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'info' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'
          }`}
        >
          <Package size={18} className="mr-2" /> Informações
        </button>
        <button
          onClick={() => setActiveTab('financial')}
          className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'financial' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'
          }`}
        >
          <DollarSign size={18} className="mr-2" /> Financeiro & Despesas
        </button>
        <button
          onClick={() => setActiveTab('fiscal')}
          className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'fiscal' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'
          }`}
        >
          <FileText size={18} className="mr-2" /> Documentos Fiscais
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Rota e Logística">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800"></div>
                  <div className="h-12 w-0.5 bg-slate-700 my-1"></div>
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-800"></div>
                </div>
                <div className="flex-1 space-y-8">
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Origem</p>
                    <p className="text-lg font-bold text-white">{freight.origin}</p>
                    <p className="text-sm text-slate-500">Data Prevista: {freight.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Destino</p>
                    <p className="text-lg font-bold text-white">{freight.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card title="Recursos Alocados">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      <User className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Motorista</p>
                      <p className="font-medium text-white">{driver?.name || 'Não atribuído'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-xs">
                    Alterar
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      <Truck className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Veículo</p>
                      <p className="font-medium text-white">
                        {vehicle ? `${vehicle.model} (${vehicle.plate})` : 'Não atribuído'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-xs">
                    Alterar
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Valor do Frete</p>
                  <h2 className="text-3xl font-bold text-emerald-400">R$ {formatCurrency(freight.value)}</h2>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <DollarSign className="text-emerald-400" size={24} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPICard title="Valor Bruto" value={`R$ ${formatCurrency(freight.value)}`} icon={<DollarSign />} />
            <KPICard title="Despesas Totais" value={`R$ ${formatCurrency(totalExpenses)}`} icon={<Receipt />} />
            <KPICard title="Margem de Lucro" value={`R$ ${formatCurrency(profit)}`} icon={<Package />} />
          </div>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-bold text-white">Despesas da Viagem</h3>
            <Button variant="secondary" onClick={onAddExpense}>
              <Plus size={16} className="mr-2" /> Adicionar Despesa
            </Button>
          </div>

          <DataTable
            data={expenses}
            columns={[
              { header: 'Data', accessor: 'date' as keyof Expense },
              { header: 'Categoria', accessor: 'category' as keyof Expense },
              { header: 'Descrição', accessor: 'description' as keyof Expense },
              {
                header: 'Valor',
                accessor: (row: Expense) => <span className="text-red-400 font-medium">- R$ {row.amount.toFixed(2)}</span>,
              },
            ]}
            keyField="id"
          />

          {expenses.length === 0 && (
            <div className="text-center py-8 border border-dashed border-slate-700 rounded-lg text-slate-500">
              Nenhuma despesa vinculada a este frete.
            </div>
          )}
        </div>
      )}

      {activeTab === 'fiscal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Status Fiscal do CT-e">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">CT-e #{freight.cteNumber || '—'}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getFiscalStatusColor(freight.cteStatus)}`}
                  >
                    {freight.cteStatus || 'Pendente'}
                  </span>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <p className="text-slate-300 font-semibold">NF-e</p>
                  <p className="truncate max-w-[220px] text-slate-400">{freight.nfeKey || 'N/A'}</p>
                  <p className="text-slate-500 mt-1">Tipo: {freight.cteType || 'Normal'}</p>
                  <p className="text-slate-500">Tomador: {freight.serviceTaker || 'Remetente'}</p>
                </div>
              </div>
            </Card>

            <Card title="MDF-e e Percurso">
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${
                      freight.mdfStatus === 'Aberto'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    MDF-e {freight.mdfStatus || 'N/A'}
                  </span>
                  {freight.routeUFs && freight.routeUFs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {freight.routeUFs.map(uf => (
                        <span
                          key={uf}
                          className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200"
                        >
                          {uf}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {freight.mdfStatus === 'Aberto' && (
                    <Button variant="secondary" className="text-xs">
                      Encerrar MDF-e
                    </Button>
                  )}
                  {freight.mdfStatus === 'N/A' && freight.cteStatus === 'Autorizado' && (
                    <Button className="text-xs">
                      Emitir MDF-e
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Downloads e Impressos">
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="text-sm">
                  <Download size={16} className="mr-2" /> Baixar DACTE (PDF)
                </Button>
                <Button variant="secondary" className="text-sm">
                  <FileDown size={16} className="mr-2" /> Baixar XML do CT-e
                </Button>
              </div>
            </Card>

            <Card title="Ações CT-e">
              <div className="flex flex-wrap gap-3">
                <Button variant="danger" className="text-sm bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white">
                  <AlertTriangle size={16} className="mr-2" /> Cancelar CT-e
                </Button>
                <Button variant="secondary" className="text-sm">
                  <ShieldCheck size={16} className="mr-2" /> Carta de Correção
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreightDetail;
