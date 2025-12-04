// # Contexto: cabeçalho da área financeira.
// # Responsabilidades: exibir título/descrição e acionar exportação.

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../../../components/ui/Common';

type FinancialHeaderProps = {
  onExport?: () => void;
};

const FinancialHeader: React.FC<FinancialHeaderProps> = ({ onExport }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>
      <h1 className="text-2xl font-bold text-white">Departamento Financeiro</h1>
      <p className="text-slate-400">Gestão de fluxo de caixa, contas e resultados.</p>
    </div>
    <div className="flex gap-2">
      <Button variant="secondary" onClick={onExport} type="button">
        <Download size={18} className="mr-2" /> Exportar
      </Button>
    </div>
  </div>
);

export default FinancialHeader;
