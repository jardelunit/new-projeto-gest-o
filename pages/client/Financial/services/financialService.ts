// # Contexto: serviço simulado financeiro.
// # Responsabilidades: montar contas a pagar/receber a partir de mocks e calcular dados de DRE.

import { mockExpenses, mockFreights } from '../../../../mocks';
import { Expense, Freight } from '../../../../types';

export type Receivable = Freight & {
  dueDate: string;
  paymentStatus: 'Recebido' | 'Pendente';
};

export type Payable = Expense & {
  supplier: string;
  dueDate: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
};

export type DreData = {
  grossRevenue: number;
  taxes: number;
  netRevenue: number;
  variableCosts: number;
  contributionMargin: number;
  fixedExpenses: number;
  netProfit: number;
};

export const getReceivables = (): Receivable[] =>
  mockFreights.map((freight) => ({
    ...freight,
    dueDate: freight.date,
    paymentStatus: freight.status === 'Entregue' ? 'Recebido' : 'Pendente',
  }));

export const getPayables = (): Payable[] =>
  mockExpenses.map((expense) => ({
    ...expense,
    supplier: expense.description,
    dueDate: expense.date,
    status: new Date(expense.date) < new Date() ? 'Pago' : 'Pendente',
  }));

export const getDreData = (): DreData => {
  const grossRevenue = mockFreights
    .filter((freight) => freight.status !== 'Cancelado')
    .reduce((acc, freight) => acc + freight.value, 0);

  const taxes = mockExpenses
    .filter((expense) => expense.category === 'Imposto')
    .reduce((acc, expense) => acc + expense.amount, 0);

  const netRevenue = grossRevenue - taxes;

  const variableCosts = mockExpenses
    .filter((expense) => expense.category === 'Variável' || expense.category === 'Combustível')
    .reduce((acc, expense) => acc + expense.amount, 0);

  const contributionMargin = netRevenue - variableCosts;

  const fixedExpenses = mockExpenses
    .filter((expense) => ['Fixa', 'Seguro', 'Financiamento'].includes(expense.category))
    .reduce((acc, expense) => acc + expense.amount, 0);

  const netProfit = contributionMargin - fixedExpenses;

  return { grossRevenue, taxes, netRevenue, variableCosts, contributionMargin, fixedExpenses, netProfit };
};
