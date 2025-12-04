// # Contexto: serviço simulado da frota.
// # Responsabilidades: retornar listas mock de veículos, documentos, despesas e manutenções.

import { Document, Expense, Maintenance, Vehicle } from '../../../../types';
import { mockDocuments, mockExpenses, mockMaintenances, mockVehicles } from '../../../../mocks';

export const getVehicles = async (): Promise<Vehicle[]> => Promise.resolve([...mockVehicles]);

export const getDocuments = async (): Promise<Document[]> => Promise.resolve([...mockDocuments]);

export const getExpenses = async (): Promise<Expense[]> => Promise.resolve([...mockExpenses]);

export const getMaintenances = async (): Promise<Maintenance[]> => Promise.resolve([...mockMaintenances]);
