// # Contexto: serviço simulado de fretes.
// # Responsabilidades: fornecer fretes, motoristas, veículos, despesas por frete e criar novos fretes.

import { Driver, Expense, Freight, Vehicle } from '../../../../types';
import { mockDrivers, mockExpenses, mockFreights, mockVehicles } from '../../../../mocks';

export const fetchFreights = (): Freight[] => [...mockFreights];

export const fetchDrivers = (): Driver[] => [...mockDrivers];

export const fetchVehicles = (): Vehicle[] => [...mockVehicles];

export const fetchExpensesByFreight = (freightId: string): Expense[] =>
  mockExpenses.filter(expense => expense.freightId === freightId);

export const createFreight = (data: Partial<Freight>): Freight => ({
  id: `f${Date.now()}`,
  origin: data.origin || '',
  destination: data.destination || '',
  value: data.value || 0,
  date: data.date || '',
  status: data.status ?? 'Pendente',
  driverId: data.driverId,
  vehicleId: data.vehicleId,
  cteNumber: data.cteNumber || `CTE-${Date.now().toString().slice(-6)}`,
  cteStatus: data.cteStatus || 'Em Processamento',
  nfeKey: data.nfeKey,
  mdfStatus: data.mdfStatus || 'N/A',
  cteType: data.cteType || 'Normal',
  serviceTaker: data.serviceTaker || 'Remetente',
  routeUFs: data.routeUFs || [],
  pickupDate: data.pickupDate,
  deliveryDate: data.deliveryDate,
  freightComponents: data.freightComponents || {
    total: data.value || 0,
    adValorem: data.freightComponents?.adValorem,
    gris: data.freightComponents?.gris,
    pedagio: data.freightComponents?.pedagio,
    regimeTributario: data.freightComponents?.regimeTributario,
    baseCalculo: data.freightComponents?.baseCalculo,
    aliquota: data.freightComponents?.aliquota,
  },
});
