import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, BarChart3, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Common';
import { mockPlans } from '../../mocks/index';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">LogiMaster</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Preços</a>
              <Link to="/login">
                <Button variant="primary" className="bg-blue-600 hover:bg-blue-500">
                  Login Cliente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            O Futuro da Gestão <span className="text-blue-500">Logística</span>
          </h1>
          <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Controle sua frota, gerencie fretes e analise a performance financeira em um dashboard moderno e intuitivo com tema escuro.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button className="px-8 py-4 text-lg">Começar Grátis</Button>
            </Link>
            <Button variant="secondary" className="px-8 py-4 text-lg">Ver Demo</Button>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950"></div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Por que escolher o LogiMaster?</h2>
            <p className="mt-4 text-slate-400">Tudo que você precisa para escalar seu negócio de transporte.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Truck className="h-10 w-10 text-blue-500" />, title: "Gestão de Frota", desc: "Rastreamento em tempo real do status dos veículos, registros de manutenção e alocação de motoristas." },
              { icon: <BarChart3 className="h-10 w-10 text-blue-500" />, title: "Análise Financeira", desc: "Insights profundos sobre receita, despesas e margens de lucro por frete." },
              { icon: <ShieldCheck className="h-10 w-10 text-blue-500" />, title: "Conformidade e Segurança", desc: "Alertas automatizados para renovação de licenças, vencimento de seguros e direção segura." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white">Planos Simples e Transparentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mockPlans.map((plan, idx) => (
                    <div key={idx} className={`relative p-8 rounded-2xl border ${idx === 1 ? 'border-blue-500 bg-slate-800' : 'border-slate-800 bg-slate-900'} flex flex-col`}>
                        {idx === 1 && <span className="absolute top-0 right-0 bg-blue-600 text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-bold">POPULAR</span>}
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <div className="my-6">
                            <span className="text-4xl font-extrabold">R$ {plan.price}</span>
                            <span className="text-slate-500">/mês</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-center text-slate-400">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <Button variant={idx === 1 ? 'primary' : 'secondary'} className="w-full">Escolher {plan.name}</Button>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>&copy; 2024 LogiMaster TMS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;