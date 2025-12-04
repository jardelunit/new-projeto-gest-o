// # Contexto: serviço mock de motoristas.
// # Responsabilidades: fornecer coleções mock, criar novos registros e montar relações de um motorista.

import { Driver, Expense, Fine, Freight, Vehicle } from '../../../../types';
import { mockDrivers, mockVehicles, mockFines, mockFreights, mockExpenses } from '../../../../mocks';

export type DriverRelationSources = {
    vehicles?: Vehicle[];
    freights?: Freight[];
    expenses?: Expense[];
    fines?: Fine[];
};

export interface DriverRelations {
    vehicle?: Vehicle;
    freights: Freight[];
    expenses: Expense[];
    fines: Fine[];
}

// Retorna todos os motoristas mockados.
export const getDrivers = (): Driver[] => mockDrivers;

// Retorna todas as multas mockadas.
export const getFines = (): Fine[] => mockFines;

// Retorna todos os fretes mockados.
export const getFreights = (): Freight[] => mockFreights;

// Retorna todas as despesas mockadas.
export const getExpenses = (): Expense[] => mockExpenses;

// Retorna todos os veículos mockados.
export const getVehicles = (): Vehicle[] => mockVehicles;

// Monta relações do motorista a partir de coleções fornecidas ou, em último caso, dos mocks.
export const getDriverRelations = (driverId: string, sources?: DriverRelationSources): DriverRelations => {
    const vehicles = sources?.vehicles ?? mockVehicles;
    const freights = sources?.freights ?? mockFreights;
    const expenses = sources?.expenses ?? mockExpenses;
    const fines = sources?.fines ?? mockFines;

    return {
        vehicle: vehicles.find(v => v.driverId === driverId),
        freights: freights.filter(f => f.driverId === driverId),
        expenses: expenses.filter(e => e.driverId === driverId),
        fines: fines.filter(f => f.driverId === driverId),
    };
};

// Cria um registro de motorista com fallback para valores obrigatórios.
export const createDriver = (data: Partial<Driver>): Driver => ({
    id: `d${Date.now()}`,
    name: data.name || '',
    phone: data.phone || '',
    cnh: data.cnh || '',
    cnhExpiry: data.cnhExpiry || new Date().toISOString().split('T')[0],
    cnhCategory: (data.cnhCategory as Driver['cnhCategory']) || 'C',
    status: data.status || 'Ativo',
});
