import React from 'react';
import { KPICard, DataTable, Button, Card } from '../../components/ui/Common';
import { RevenueChart } from '../../components/charts/DashboardCharts';
import { adminKPIs, mockCarriers } from '../../mocks/index';
import { DollarSign, Truck, Users, Activity, Download } from 'lucide-react';
import { Carrier } from '../../types';

const Overview: React.FC = () => {
  const getIcon = (label: string) => {
    if (label.includes('Receita')) return <DollarSign size={20} />;
    if (label.includes('Transp.')) return <Truck size={20} />;
    if (label.includes('Usuários')) return <Users size={20} />;
    return <Activity size={20} />;
  };

  const columns = [
    { header: 'Empresa', accessor: 'name' as keyof Carrier, className: 'font-medium text-white' },
    { header: 'CNPJ', accessor: 'cnpj' as keyof Carrier },
    { 
      header: 'Plano', 
      accessor: (row: Carrier) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          row.plan === 'Empresarial' ? 'bg-purple-500/20 text-purple-400' :
          row.plan === 'Profissional' ? 'bg-blue-500/20 text-blue-400' :
          'bg-slate-500/20 text-slate-400'
        }`}>
          {row.plan}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: (row: Carrier) => (
        <span className={`flex items-center ${row.status === 'Ativo' ? 'text-emerald-400' : 'text-red-400'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${row.status === 'Ativo' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
          {row.status}
        </span>
      )
    },
    { header: 'Entrou em', accessor: 'joinedAt' as keyof Carrier },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Visão Geral Admin</h1>
          <p className="text-slate-400">Performance da plataforma e gestão de transportadoras.</p>
        </div>
        <Button variant="secondary">
          <Download size={16} className="mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminKPIs.map((kpi, idx) => (
          <KPICard 
            key={idx}
            title={kpi.label}
            value={kpi.isCurrency ? `R$ ${kpi.value}` : kpi.value}
            change={kpi.change}
            icon={getIcon(kpi.label)}
          />
        ))}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
            <Card title="Alertas do Sistema" className="h-full">
              <ul className="space-y-4">
                  <li className="flex items-start pb-4 border-b border-slate-700">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                      <div>
                          <p className="text-sm font-medium text-slate-200">Novo Cadastro Empresarial</p>
                          <p className="text-xs text-slate-500">TransRapid Logística aderiu ao plano Empresarial.</p>
                      </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-slate-700">
                      <div className="w-2 h-2 mt-2 rounded-full bg-red-500 mr-3"></div>
                      <div>
                          <p className="text-sm font-medium text-slate-200">Falha no Pagamento</p>
                          <p className="text-xs text-slate-500">Fatura #9902 da BlueSky Cargas falhou.</p>
                      </div>
                  </li>
                  <li className="flex items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 mr-3"></div>
                      <div>
                          <p className="text-sm font-medium text-slate-200">Manutenção do Servidor</p>
                          <p className="text-xs text-slate-500">Agendada para Domingo às 02:00.</p>
                      </div>
                  </li>
              </ul>
            </Card>
        </div>
      </div>

      {/* Carriers Table */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Transportadoras Recentes</h2>
        <DataTable 
          data={mockCarriers}
          columns={columns}
          keyField="id"
        />
      </div>
    </div>
  );
};

export default Overview;
