// # Contexto: utilitários de exibição da visão geral.
// # Responsabilidades: formatar moeda e mapear status de frete para classes de cor.

import { Freight } from '../../../../types';

const FREIGHT_STATUS_COLORS: Record<Freight['status'], string> = {
  'Em Progresso': 'bg-blue-500/20 text-blue-400',
  Entregue: 'bg-emerald-500/20 text-emerald-400',
  Pendente: 'bg-yellow-500/20 text-yellow-400',
  Cancelado: 'bg-red-500/20 text-red-400',
};

export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return `R$ ${numericValue.toLocaleString()}`;
};

export const getFreightStatusClass = (status: Freight['status']): string =>
  FREIGHT_STATUS_COLORS[status];
