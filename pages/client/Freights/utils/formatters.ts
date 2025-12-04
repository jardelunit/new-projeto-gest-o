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
