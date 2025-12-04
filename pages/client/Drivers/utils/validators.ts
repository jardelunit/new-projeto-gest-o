// # Contexto: validações e status de CNH.
// # Responsabilidades: calcular situação da CNH (válida, a vencer, vencida) para alertas visuais.

import { Driver } from '../../../../types';

export const getCNHStatus = (expiryDate: Driver['cnhExpiry']) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Vencida', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
    if (diffDays < 30) return { label: 'A Vencer', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
    return { label: 'Válida', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
};
