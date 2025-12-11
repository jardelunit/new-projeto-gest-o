// # Contexto: utilitários do módulo de fretes.
// # Responsabilidades: mapear status para classes de cor e formatar valores.

import { Freight } from '../../../../types';

export const getStatusColor = (status: Freight['status'] | string) => {
  switch (status) {
    case 'Pendente':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Em Progresso':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Entregue':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Cancelado':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export const formatCurrency = (value: number) => value.toLocaleString();

export const getFiscalStatusColor = (status?: Freight['cteStatus']) => {
  switch (status) {
    case 'Autorizado':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    case 'Rejeitado':
      return 'bg-red-500/20 text-red-300 border-red-500/50';
    case 'Em Processamento':
      return 'bg-blue-500/20 text-blue-200 border-blue-500/40';
    case 'Pendente':
    default:
      return 'bg-amber-500/20 text-amber-200 border-amber-500/40';
  }
};
