// # Contexto: hook central de estado da frota.
// # Responsabilidades: carregar mocks, sincronizar aba com URL, filtrar veículos, selecionar veículo e preparar resumos.

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Expense, Maintenance, Vehicle } from '../../../../types';
import { getDocuments, getExpenses, getMaintenances, getVehicles } from '../services/fleetService';

export type FleetTab = 'overview' | 'vehicles' | 'maintenance' | 'docs' | 'report';

export type FleetSummary = Vehicle & {
  totalCost: number;
  maintCount: number;
  costPerKm: number;
};

export type VehicleTimelineEvent = { date: string; type: 'Despesa' | 'Manutenção' | 'Documento'; desc: string; val: number };

export type VehicleSnapshot = {
  vehicle: Vehicle;
  maintenances: Maintenance[];
  documents: Document[];
  expenses: Expense[];
  maintTotal: number;
  expensesTotal: number;
  grandTotal: number;
  timeline: VehicleTimelineEvent[];
  pieData: { name: string; value: number }[];
  upcomingDoc?: Document;
};

const validTabs: FleetTab[] = ['overview', 'vehicles', 'maintenance', 'docs', 'report'];

export const statusTone: Record<Vehicle['status'], string> = {
  Disponível: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  'Em Trânsito': 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  Manutenção: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
};

const useFleet = () => {
  const [activeTab, setActiveTab] = useState<FleetTab>('overview');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [reportVehicleId, setReportVehicleId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const [vehiclesData, documentsData, expensesData, maintenancesData] = await Promise.all([
        getVehicles(),
        getDocuments(),
        getExpenses(),
        getMaintenances(),
      ]);

      if (!isMounted) return;
      setVehicles(vehiclesData);
      setDocuments(documentsData);
      setExpenses(expensesData);
      setMaintenances(maintenancesData);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');

    if (tabParam === 'expenses') {
      setActiveTab('report');
      setSelectedVehicle(null);
      setReportVehicleId(null);
      return;
    }

    if (tabParam && validTabs.includes(tabParam as FleetTab)) {
      setActiveTab(tabParam as FleetTab);
      setSelectedVehicle(null);
      setReportVehicleId(null);
    }
  }, [location.search]);

  const handleTabChange = (tab: FleetTab) => {
    setActiveTab(tab);
    setSelectedVehicle(null);
    setReportVehicleId(null);
    navigate(`/client/fleet?tab=${tab}`);
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesStatus = filterStatus === 'Todos' || vehicle.status === filterStatus;
      const term = searchTerm.toLowerCase();
      const matchesSearch = vehicle.plate.toLowerCase().includes(term) || vehicle.model.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [vehicles, filterStatus, searchTerm]);

  const quickCounts = useMemo(() => {
    const available = vehicles.filter((vehicle) => vehicle.status === 'Disponível').length;
    const inTransit = vehicles.filter((vehicle) => vehicle.status === 'Em Trânsito').length;
    const docsDue = documents.filter((doc) => doc.status !== 'Válido').length;
    const maintPending = maintenances.filter((maint) => maint.status !== 'Concluída').length;

    return {
      available,
      inTransit,
      docsDue,
      maintPending,
      totalVehicles: vehicles.length,
    };
  }, [vehicles, documents, maintenances]);

  const tabs = useMemo(() => [...validTabs], []);

  const fleetSummary = useMemo<FleetSummary[]>(() => {
    return vehicles.map((vehicle) => {
      const vehicleExpenses = expenses.filter((expense) => expense.vehicleId === vehicle.id);
      const vehicleMaintenances = maintenances.filter((maint) => maint.vehicleId === vehicle.plate);

      const totalExpenseCost = vehicleExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      const totalMaintCost = vehicleMaintenances.reduce((acc, maint) => acc + maint.cost, 0);
      const totalCost = totalExpenseCost + totalMaintCost;
      const costPerKm = vehicle.currentKm > 0 ? totalCost / vehicle.currentKm : 0;

      return {
        ...vehicle,
        totalCost,
        maintCount: vehicleMaintenances.length,
        costPerKm,
      };
    });
  }, [vehicles, expenses, maintenances]);

  const getVehicleSnapshot = (vehicleId: string): VehicleSnapshot | null => {
    const vehicle = vehicles.find((item) => item.id === vehicleId);
    if (!vehicle) return null;

    const vehicleExpenses = expenses.filter((expense) => expense.vehicleId === vehicle.id);
    const vehicleMaintenances = maintenances.filter((maint) => maint.vehicleId === vehicle.plate);
    const vehicleDocuments = documents.filter((doc) => doc.entityId === vehicle.plate);

    const expensesTotal = vehicleExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const maintTotal = vehicleMaintenances.reduce((acc, maint) => acc + maint.cost, 0);
    const grandTotal = expensesTotal + maintTotal;
    const upcomingDoc = vehicleDocuments.find((doc) => doc.status === 'A Vencer') || vehicleDocuments[0];

    const timeline = [
      ...vehicleExpenses.map((expense) => ({
        date: expense.date,
        type: 'Despesa' as const,
        desc: expense.description,
        val: expense.amount,
      })),
      ...vehicleMaintenances.map((maint) => ({
        date: maint.date,
        type: 'Manutenção' as const,
        desc: maint.description,
        val: maint.cost,
      })),
      ...vehicleDocuments.map((doc) => ({
        date: doc.expiryDate,
        type: 'Documento' as const,
        desc: `Vencimento: ${doc.title}`,
        val: 0,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const pieData = [
      { name: 'Manutenção', value: maintTotal },
      { name: 'Combustível', value: vehicleExpenses.filter((expense) => expense.category === 'Variável').reduce((acc, item) => acc + item.amount, 0) },
      { name: 'Outros', value: vehicleExpenses.filter((expense) => expense.category !== 'Variável').reduce((acc, item) => acc + item.amount, 0) },
    ];

    return {
      vehicle,
      maintenances: vehicleMaintenances,
      documents: vehicleDocuments,
      expenses: vehicleExpenses,
      maintTotal,
      expensesTotal,
      grandTotal,
      timeline,
      pieData,
      upcomingDoc,
    };
  };

  const selectVehicle = (vehicle: Vehicle) => setSelectedVehicle(vehicle);
  const clearSelectedVehicle = () => setSelectedVehicle(null);
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  return {
    activeTab,
    handleTabChange,
    tabs,
    vehicles,
    documents,
    expenses,
    maintenances,
    filteredVehicles,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    selectedVehicle,
    selectVehicle,
    clearSelectedVehicle,
    reportVehicleId,
    setReportVehicleId,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    quickCounts,
    statusTone,
    fleetSummary,
    getVehicleSnapshot,
  };
};

export default useFleet;
