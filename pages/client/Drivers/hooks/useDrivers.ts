// # Contexto: hook de gestão de motoristas.
// # Responsabilidades: carregar coleções mock, controlar abas, filtros, seleção, criação e modais.

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Driver, Expense, Fine, Freight, Vehicle } from '../../../../types';
import {
    createDriver,
    DriverRelations,
    getDriverRelations,
    getDrivers,
    getExpenses,
    getFines,
    getFreights,
    getVehicles,
} from '../services/driverService';
import { getCNHStatus } from '../utils/validators';

export type DriverTab = 'overview' | 'drivers';

const validTabs: DriverTab[] = ['overview', 'drivers'];

const initialNewDriver: Partial<Driver> = {
    name: '',
    phone: '',
    cnh: '',
    cnhExpiry: '',
    cnhCategory: 'C',
    status: 'Ativo',
};

type DriverFilters = {
    term: string;
    status: Driver['status'] | 'Todos';
};

type QuickCounts = {
    total: number;
    active: number;
    onLeave: number;
    expiring: number;
    pendingFines: number;
    onRoute: number;
};

export type DriverQuickCounts = QuickCounts;

// Filtra motoristas por termo e status para reutilizar em diferentes visões.
const filterDrivers = (drivers: Driver[], { term, status }: DriverFilters) => {
    const lowerTerm = term.toLowerCase();
    return drivers.filter(driver => {
        const matchesStatus = status === 'Todos' || driver.status === status;
        const matchesTerm =
            driver.name.toLowerCase().includes(lowerTerm) ||
            driver.cnh.toLowerCase().includes(lowerTerm) ||
            driver.phone.toLowerCase().includes(lowerTerm);
        return matchesStatus && matchesTerm;
    });
};

// Calcula contadores rápidos (ativos, CNH a vencer, multas pendentes, etc.).
const buildQuickCounts = (drivers: Driver[], fines: Fine[], freights: Freight[]): QuickCounts => {
    const total = drivers.length;
    const active = drivers.filter(driver => driver.status === 'Ativo').length;
    const onLeave = drivers.filter(driver => driver.status !== 'Ativo').length;
    const expiring = drivers.filter(driver => {
        const status = getCNHStatus(driver.cnhExpiry);
        return status.label === 'A Vencer' || status.label === 'Vencida';
    }).length;
    const pendingFines = fines.filter(fine => fine.status === 'Pendente').length;
    const onRoute = freights.filter(freight => freight.driverId && freight.status !== 'Cancelado').length;

    return { total, active, onLeave, expiring, pendingFines, onRoute };
};

// Monta relações do motorista usando coleções já carregadas.
const buildRelations = (
    driverId: string,
    driversData: { vehicles: Vehicle[]; freights: Freight[]; expenses: Expense[]; fines: Fine[] },
): DriverRelations => {
    return getDriverRelations(driverId, driversData);
};

const useDrivers = () => {
    const [activeTab, setActiveTab] = useState<DriverTab>('overview');
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [fines, setFines] = useState<Fine[]>([]);
    const [freights, setFreights] = useState<Freight[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [newDriver, setNewDriver] = useState<Partial<Driver>>(initialNewDriver);
    const [filters, setFilters] = useState<DriverFilters>({ term: '', status: 'Todos' });
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isFineModalOpen, setFineModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Carrega coleções mockadas uma única vez.
    useEffect(() => {
        const loadData = () => {
            setDrivers(getDrivers());
            setFines(getFines());
            setFreights(getFreights());
            setExpenses(getExpenses());
            setVehicles(getVehicles());
        };

        loadData();
    }, []);

    // Sincroniza aba com a query string (?tab=) para permitir links diretos.
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab');

        if (tabParam && validTabs.includes(tabParam as DriverTab)) {
            setActiveTab(tabParam as DriverTab);
            setSelectedDriverId(null);
        }
    }, [location.search]);

    const handleTabChange = (tab: DriverTab) => {
        setActiveTab(tab);
        setSelectedDriverId(null);
        navigate(`/client/drivers?tab=${tab}`);
    };

    const filteredDrivers = useMemo(() => filterDrivers(drivers, filters), [drivers, filters]);

    const selectedDriver = useMemo(
        () => drivers.find(driver => driver.id === selectedDriverId) || null,
        [drivers, selectedDriverId],
    );

    const relations = useMemo(() => {
        if (!selectedDriver) return null;
        return buildRelations(selectedDriver.id, { vehicles, freights, expenses, fines });
    }, [selectedDriver, vehicles, freights, expenses, fines]);

    const quickCounts = useMemo(() => buildQuickCounts(drivers, fines, freights), [drivers, fines, freights]);

    // Reseta modal de multa quando não há motorista selecionado.
    useEffect(() => {
        if (!selectedDriverId) {
            setFineModalOpen(false);
        }
    }, [selectedDriverId]);

    // Cadastra novo motorista e atualiza lista.
    const handleCreateDriver = (e: React.FormEvent) => {
        e.preventDefault();
        if (newDriver.name && newDriver.cnh) {
            const driver = createDriver(newDriver);
            setDrivers(prev => [driver, ...prev]);
            setCreateModalOpen(false);
            setNewDriver(initialNewDriver);
        }
    };

    // Atualiza campos do formulário de novo motorista.
    const handleNewDriverChange = (field: keyof Driver, value: string) => {
        setNewDriver(prev => ({ ...prev, [field]: value } as Partial<Driver>));
    };

    // Atualiza filtros de listagem (termo e status).
    const handleFilterChange = (field: keyof DriverFilters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value } as DriverFilters));
    };

    return {
        activeTab,
        handleTabChange,
        drivers,
        fines,
        freights,
        expenses,
        vehicles,
        filters,
        filteredDrivers,
        selectedDriver,
        relations,
        newDriver,
        quickCounts,
        isCreateModalOpen,
        isFineModalOpen,
        selectDriver: (driver: Driver) => setSelectedDriverId(driver.id),
        goBackToList: () => setSelectedDriverId(null),
        openCreateModal: () => setCreateModalOpen(true),
        closeCreateModal: () => setCreateModalOpen(false),
        openFineModal: () => setFineModalOpen(true),
        closeFineModal: () => setFineModalOpen(false),
        handleCreateDriver,
        handleNewDriverChange,
        handleFilterChange,
    };
};

export default useDrivers;
