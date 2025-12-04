
import React from 'react';
import { Button, Card } from '../../components/ui/Common';
import { mockPlans } from '../../mocks/index';
import { CheckCircle2, Edit } from 'lucide-react';

const Plans: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Planos e Preços</h1>
          <p className="text-slate-400">Gerencie os pacotes de assinatura disponíveis.</p>
        </div>
        <Button>+ Novo Plano</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col relative">
                <div className="absolute top-4 right-4">
                    <button className="text-slate-500 hover:text-white"><Edit size={18} /></button>
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="my-6">
                    <span className="text-4xl font-extrabold text-white">R$ {plan.price}</span>
                    <span className="text-slate-500">/mês</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">Incluso:</p>
                    <ul className="space-y-3">
                        {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-center text-slate-300 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>
                <Button variant="secondary" className="mt-8 w-full">Editar Detalhes</Button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
