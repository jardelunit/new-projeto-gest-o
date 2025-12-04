// # Contexto: card promocional de upgrade.
// # Responsabilidades: incentivar upgrade de plano com CTA.

import React from 'react';
import { Button } from '../../../../components/ui/Common';

const UpgradeCard: React.FC = () => (
  <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-6 rounded-lg border border-blue-800">
    <h3 className="text-lg font-semibold text-white mb-2">Upgrade para Empresarial</h3>
    <p className="text-sm text-blue-200 mb-4">Desbloqueie acesso à API e rastreamento ilimitado.</p>
    <Button className="w-full bg-white text-blue-900 hover:bg-slate-100" type="button">
      Ver Planos
    </Button>
  </div>
);

export default UpgradeCard;
