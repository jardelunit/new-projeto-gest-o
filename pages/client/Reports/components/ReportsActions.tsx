// # Contexto: ações de relatórios.
// # Responsabilidades: oferecer exportação (PDF/Excel) e impressão com estado de carregamento.

import React from 'react';
import { FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { Button } from '../../../../components/ui/Common';
import { ReportExportType } from '../services/reportsService';

type ReportsActionsProps = {
  isExporting: boolean;
  onExport: (type: ReportExportType) => void;
  onPrint: () => void;
};

const ReportsActions: React.FC<ReportsActionsProps> = ({ isExporting, onExport, onPrint }) => (
  <div className="flex flex-col md:flex-row gap-4 border-t border-slate-700 pt-4 justify-end">
    <Button variant="secondary" onClick={() => onExport('PDF')} isLoading={isExporting}>
      <FileText size={18} className="mr-2 text-red-400" />
      Exportar PDF
    </Button>
    <Button variant="secondary" onClick={() => onExport('Excel')} isLoading={isExporting}>
      <FileSpreadsheet size={18} className="mr-2 text-emerald-400" />
      Exportar Excel
    </Button>
    <Button variant="primary" onClick={onPrint}>
      <Printer size={18} className="mr-2" />
      Imprimir
    </Button>
  </div>
);

export default ReportsActions;
