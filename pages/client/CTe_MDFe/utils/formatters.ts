// # Contexto: utilitários de formatação para CT-e/MDF-e.
// # Responsabilidades: mapear rótulos/cores de status e formatar valores.

import { ElectronicDocStatus } from '../services/cteMdfeService';

export const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatDate = (value: string): string => new Date(value).toLocaleDateString('pt-BR');

export const statusLabels: Record<ElectronicDocStatus, string> = {
  rascunho: 'Rascunho',
  em_transmissao: 'Transmitindo',
  autorizado: 'Autorizado',
  rejeitado: 'Rejeitado',
  cancelado: 'Cancelado',
};

export const statusClasses: Record<ElectronicDocStatus, string> = {
  rascunho: 'bg-slate-700/60 text-slate-200 border border-slate-600',
  em_transmissao: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
  autorizado: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
  rejeitado: 'bg-red-500/20 text-red-300 border border-red-500/40',
  cancelado: 'bg-amber-500/20 text-amber-200 border border-amber-500/40',
};
