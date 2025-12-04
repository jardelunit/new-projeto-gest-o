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
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  isExpenseModalOpen: boolean;
  openExpenseModal: () => void;
  closeExpenseModal: () => void;
  formData: Partial<Freight>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Freight>>>;
  handleCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleStatusUpdate: (id: string, newStatus: Freight['status']) => void;
  drivers: Driver[];
  vehicles: Vehicle[];
  getDriverName: (id?: string) => string;
  getVehiclePlate: (id?: string) => string;
  getDriverById: (id?: string) => Driver | undefined;
  getVehicleById: (id?: string) => Vehicle | undefined;
  getExpensesByFreight: (freightId: string) => Expense[];
}

const initialFormData: Partial<Freight> = {
  origin: '',
  destination: '',
  value: 0,
  date: new Date().toISOString().split('T')[0],
  status: 'Pendente',
};

const useFreights = (): UseFreightsReturn => {
  const [freights, setFreights] = useState<Freight[]>(() => fetchFreights());
  const [selectedFreight, setSelectedFreight] = useState<Freight | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Freight>>(initialFormData);

  const drivers = useMemo(() => fetchDrivers(), []);
  const vehicles = useMemo(() => fetchVehicles(), []);

  const selectFreight = useCallback((freight: Freight | null) => {
    setSelectedFreight(freight);
    setExpenseModalOpen(false);
  }, []);

  const openCreateModal = useCallback(() => setCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setCreateModalOpen(false), []);

  const openExpenseModal = useCallback(() => setExpenseModalOpen(true), []);
  const closeExpenseModal = useCallback(() => setExpenseModalOpen(false), []);

  const handleCreate = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newFreight = createFreight(formData);
      setFreights(prev => [newFreight, ...prev]);
      setCreateModalOpen(false);
      setFormData({ ...initialFormData, date: '' });
    },
    [formData],
  );

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
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    formData,
    setFormData,
    handleCreate,
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
