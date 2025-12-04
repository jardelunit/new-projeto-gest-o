// # Contexto: serviço simulado de relatórios.
// # Responsabilidades: retornar dados mock de fretes/veículos/motoristas/despesas e simular exportações.

import { mockDrivers, mockExpenses, mockFreights, mockVehicles } from '../../../../mocks';
import { Driver, Expense, Freight, Vehicle } from '../../../../types';

export type ReportExportType = 'PDF' | 'Excel';

export const getFreights = (): Freight[] => mockFreights;

export const getExpenses = (): Expense[] => mockExpenses;

export const getVehicles = (): Vehicle[] => mockVehicles;

export const getDrivers = (): Driver[] => mockDrivers;

export const exportReport = (type: ReportExportType): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1500);
  });
};
