// # Contexto: hook de estado do módulo de fretes.
// # Responsabilidades: carregar fretes/relacionamentos mock, criar frete, alterar status e abrir modais.

import { useCallback, useMemo, useState } from 'react';
import { Driver, Expense, Freight, Vehicle } from '../../../../types';
import {
  createFreight,
  fetchDrivers,
  fetchExpensesByFreight,
  fetchFreights,
  fetchVehicles,
} from '../services/freightService';

interface UseFreightsReturn {
  freights: Freight[];
  selectedFreight: Freight | null;
  selectFreight: (freight: Freight | null) => void;
  isWizardOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  isExpenseModalOpen: boolean;
  openExpenseModal: () => void;
  closeExpenseModal: () => void;
  addFreight: (data: Partial<Freight>) => void;
  handleStatusUpdate: (id: string, newStatus: Freight['status']) => void;
  drivers: Driver[];
  vehicles: Vehicle[];
  getDriverName: (id?: string) => string;
  getVehiclePlate: (id?: string) => string;
  getDriverById: (id?: string) => Driver | undefined;
  getVehicleById: (id?: string) => Vehicle | undefined;
  getExpensesByFreight: (freightId: string) => Expense[];
}

const useFreights = (): UseFreightsReturn => {
  const [freights, setFreights] = useState<Freight[]>(() => fetchFreights());
  const [selectedFreight, setSelectedFreight] = useState<Freight | null>(null);
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  const drivers = useMemo(() => fetchDrivers(), []);
  const vehicles = useMemo(() => fetchVehicles(), []);

  const selectFreight = useCallback((freight: Freight | null) => {
    setSelectedFreight(freight);
    setExpenseModalOpen(false);
  }, []);

  const openWizard = useCallback(() => setWizardOpen(true), []);
  const closeWizard = useCallback(() => setWizardOpen(false), []);

  const openExpenseModal = useCallback(() => setExpenseModalOpen(true), []);
  const closeExpenseModal = useCallback(() => setExpenseModalOpen(false), []);

  const addFreight = useCallback((data: Partial<Freight>) => {
    const newFreight = createFreight(data);
    setFreights(prev => [newFreight, ...prev]);
    setWizardOpen(false);
  }, []);

  const handleStatusUpdate = useCallback(
    (id: string, newStatus: Freight['status']) => {
      setFreights(prev => prev.map(freight => (freight.id === id ? { ...freight, status: newStatus } : freight)));
      setSelectedFreight(prev => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));
    },
    [],
  );

  const getDriverName = useCallback((id?: string) => drivers.find(driver => driver.id === id)?.name || 'N/A', [drivers]);

  const getVehiclePlate = useCallback(
    (id?: string) => vehicles.find(vehicle => vehicle.id === id)?.plate || 'N/A',
    [vehicles],
  );

  const getDriverById = useCallback((id?: string) => drivers.find(driver => driver.id === id), [drivers]);

  const getVehicleById = useCallback((id?: string) => vehicles.find(vehicle => vehicle.id === id), [vehicles]);

  const getExpensesByFreight = useCallback(
    (freightId: string): Expense[] => fetchExpensesByFreight(freightId),
    [],
  );

  return {
    freights,
    selectedFreight,
    selectFreight,
    isWizardOpen,
    openWizard,
    closeWizard,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    addFreight,
    handleStatusUpdate,
    drivers,
    vehicles,
    getDriverName,
    getVehiclePlate,
    getDriverById,
    getVehicleById,
    getExpensesByFreight,
  };
};

export default useFreights;
