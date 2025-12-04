// # Contexto: validações de despesas.
// # Responsabilidades: checar campos mínimos antes de cadastrar uma despesa.

import { Expense } from '../../../../types';

export const isExpenseValid = (expense: Partial<Expense>): boolean =>
  Boolean(expense.description && expense.date);
