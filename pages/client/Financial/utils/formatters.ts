// # Contexto: formatadores do financeiro.
// # Responsabilidades: formatar moeda, margem de lucro e classes de status de pagar/receber.

export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
  `R$ ${value.toLocaleString('pt-BR', options)}`;

export const formatProfitMargin = (netProfit: number, grossRevenue: number) => {
  if (!grossRevenue) return '0.0%';
  return `${((netProfit / grossRevenue) * 100).toFixed(1)}%`;
};

export const getPayableStatusClass = (status: string) => {
  if (status === 'Pago') return 'bg-emerald-500/20 text-emerald-400';
  if (status === 'Atrasado') return 'bg-red-500/20 text-red-400';
  return 'bg-yellow-500/20 text-yellow-400';
};

export const getReceivableStatusClass = (status: string) =>
  status === 'Recebido' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400';
