// # Contexto: linha reutilizável da DRE.
// # Responsabilidades: formatar valores conforme tipo (positivo/negativo/total) e indentação.

import React from 'react';
import { formatCurrency } from '../utils/formatters';

type DRERowProps = {
  label: string;
  value: number;
  type?: 'positive' | 'negative' | 'neutral' | 'total';
  indent?: boolean;
};

const DRERow: React.FC<DRERowProps> = ({ label, value, type = 'neutral', indent = false }) => {
  let textColor = 'text-slate-200';
  if (type === 'positive') textColor = 'text-emerald-400';
  if (type === 'negative') textColor = 'text-red-400';
  if (type === 'total') textColor = 'text-white font-bold text-lg';

  return (
    <div
      className={`flex justify-between items-center py-3 border-b border-slate-700/50 ${
        type === 'total' ? 'bg-slate-800/50 px-2 rounded mt-2' : ''
      }`}
    >
      <span className={`${indent ? 'pl-6' : ''} ${type === 'total' ? 'font-bold' : 'text-slate-400'}`}>{label}</span>
      <span className={`${textColor} font-mono`}>
        {type === 'negative' ? '- ' : ''}
        {formatCurrency(Math.abs(value), { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default DRERow;
