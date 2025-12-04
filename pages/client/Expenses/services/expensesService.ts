// # Contexto: serviço mock de despesas.
// # Responsabilidades: retornar lista de despesas do cliente.

import { Expense } from '../../../../types';
import { mockExpenses } from '../../../../mocks';

export const getExpenses = (): Expense[] => mockExpenses;
