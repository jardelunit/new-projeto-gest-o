
import { Carrier, Driver, Expense, Freight, KPI, Vehicle, User, Webhook, Invoice, Maintenance, Document, Fine } from '../types';

// --- Vehicles ---
export const mockVehicles: Vehicle[] = [
  { id: 'v1', plate: 'ABC-1234', model: 'Volvo FH 540', year: 2022, currentKm: 154000, status: 'Em Trânsito', driverId: 'd1', lastMaintenance: '2023-10-15' },
  { id: 'v2', plate: 'XYZ-9876', model: 'Scania R450', year: 2021, currentKm: 210500, status: 'Disponível', driverId: 'd2', lastMaintenance: '2023-11-01' },
  { id: 'v3', plate: 'DEF-5678', model: 'Mercedes Actros', year: 2023, currentKm: 45000, status: 'Manutenção', driverId: 'd3', lastMaintenance: '2023-12-10' },
  { id: 'v4', plate: 'GHI-3456', model: 'Volvo FH 460', year: 2020, currentKm: 320000, status: 'Disponível', driverId: 'd1', lastMaintenance: '2023-09-20' },
  { id: 'v5', plate: 'JKL-7890', model: 'DAF XF', year: 2019, currentKm: 410000, status: 'Em Trânsito', driverId: 'd4', lastMaintenance: '2023-11-20' },
];

// --- Drivers ---
export const mockDrivers: Driver[] = [
  { id: 'd1', name: 'Roberto Silva', cnh: '12345678900', cnhCategory: 'E', cnhExpiry: '2024-05-20', phone: '(11) 99999-1111', status: 'Ativo' },
  { id: 'd2', name: 'Carlos Mendes', cnh: '98765432100', cnhCategory: 'E', cnhExpiry: '2023-12-20', phone: '(41) 98888-2222', status: 'Ativo' },
  { id: 'd3', name: 'Jorge Lima', cnh: '11223344556', cnhCategory: 'D', cnhExpiry: '2024-11-15', phone: '(21) 97777-3333', status: 'De Licença' },
  { id: 'd4', name: 'Ana Souza', cnh: '99887766554', cnhCategory: 'E', cnhExpiry: '2025-02-10', phone: '(31) 96666-4444', status: 'Ativo' },
];

// --- Fines (Multas) ---
export const mockFines: Fine[] = [
  { id: 'multa1', driverId: 'd1', date: '2023-11-10', amount: 195.23, points: 5, description: 'Ultrapassagem em linha contínua', status: 'Pendente' },
  { id: 'multa2', driverId: 'd2', date: '2023-08-15', amount: 130.16, points: 4, description: 'Excesso de velocidade (até 20%)', status: 'Paga' },
];

// --- Freights ---
export const mockFreights: Freight[] = [
  {
    id: 'f1',
    origin: 'São Paulo, SP',
    destination: 'Curitiba, PR',
    value: 3500,
    status: 'Em Progresso',
    date: '2023-12-01',
    vehicleId: 'v1',
    driverId: 'd1',
    cteNumber: '3523-000001',
    cteStatus: 'Autorizado',
    nfeKey: '35231234567890000123450010000000011111111111',
    mdfStatus: 'Aberto',
    cteType: 'Normal',
    serviceTaker: 'Remetente',
    routeUFs: ['SP', 'PR'],
    pickupDate: '2023-12-01T08:00',
    deliveryDate: '2023-12-02T18:00',
    freightComponents: {
      total: 3500,
      adValorem: 200,
      gris: 50,
      pedagio: 120,
      regimeTributario: 'Simples Nacional',
      baseCalculo: 3200,
      aliquota: 12,
    },
  },
  {
    id: 'f2',
    origin: 'Belo Horizonte, MG',
    destination: 'Rio de Janeiro, RJ',
    value: 2800,
    status: 'Entregue',
    date: '2023-11-28',
    vehicleId: 'v2',
    driverId: 'd2',
    cteNumber: '3123-000987',
    cteStatus: 'Autorizado',
    nfeKey: '31231234567890000123450020000000022222222222',
    mdfStatus: 'Encerrado',
    cteType: 'Normal',
    serviceTaker: 'Destinatário',
    routeUFs: ['MG', 'RJ'],
    pickupDate: '2023-11-27T09:00',
    deliveryDate: '2023-11-28T16:30',
    freightComponents: {
      total: 2800,
      adValorem: 150,
      gris: 40,
      pedagio: 90,
      regimeTributario: 'Lucro Presumido',
      baseCalculo: 2500,
      aliquota: 12,
    },
  },
  {
    id: 'f3',
    origin: 'Porto Alegre, RS',
    destination: 'Florianópolis, SC',
    value: 1500,
    status: 'Pendente',
    date: '2023-12-05',
    driverId: 'd4',
    cteNumber: '4321-000123',
    cteStatus: 'Pendente',
    nfeKey: '43211234567890000123450010000000033333333333',
    mdfStatus: 'N/A',
    cteType: 'Substituição',
    serviceTaker: 'Remetente',
    routeUFs: ['RS', 'SC'],
    pickupDate: '2023-12-06T10:00',
    deliveryDate: '2023-12-06T19:30',
    freightComponents: {
      total: 1500,
      adValorem: 80,
      gris: 30,
      pedagio: 60,
      regimeTributario: 'Simples Nacional',
      baseCalculo: 1400,
      aliquota: 7,
    },
  },
  {
    id: 'f4',
    origin: 'Cuiabá, MT',
    destination: 'Santos, SP',
    value: 8900,
    status: 'Em Progresso',
    date: '2023-12-02',
    vehicleId: 'v5',
    driverId: 'd4',
    cteNumber: '5111-000555',
    cteStatus: 'Em Processamento',
    nfeKey: '51111234567890000123450030000000044444444444',
    mdfStatus: 'Aberto',
    cteType: 'Normal',
    serviceTaker: 'Destinatário',
    routeUFs: ['MT', 'GO', 'MG', 'SP'],
    pickupDate: '2023-12-02T07:30',
    deliveryDate: '2023-12-04T22:00',
    freightComponents: {
      total: 8900,
      adValorem: 420,
      gris: 130,
      pedagio: 360,
      regimeTributario: 'Lucro Real',
      baseCalculo: 8200,
      aliquota: 12,
    },
  },
  {
    id: 'f5',
    origin: 'Recife, PE',
    destination: 'Salvador, BA',
    value: 4200,
    status: 'Cancelado',
    date: '2023-11-25',
    driverId: 'd2',
    cteNumber: '2611-000321',
    cteStatus: 'Rejeitado',
    nfeKey: '26111234567890000123450040000000055555555555',
    mdfStatus: 'N/A',
    cteType: 'Anulação',
    serviceTaker: 'Remetente',
    routeUFs: ['PE', 'AL', 'BA'],
    pickupDate: '2023-11-25T06:45',
    deliveryDate: '2023-11-25T18:15',
    freightComponents: {
      total: 4200,
      adValorem: 210,
      gris: 90,
      pedagio: 150,
      regimeTributario: 'Simples Nacional',
      baseCalculo: 3900,
      aliquota: 12,
    },
  },
];

// --- Expenses ---
export const mockExpenses: Expense[] = [
  { id: 'e1', vehicleId: 'v1', freightId: 'f1', category: 'Variável', amount: 1200, date: '2023-12-02', description: 'Combustível Diesel S10' },
  { id: 'e2', vehicleId: 'v1', category: 'Variável', amount: 450, date: '2023-11-30', description: 'Troca de Óleo' },
  { id: 'e3', vehicleId: 'v1', driverId: 'd1', freightId: 'f1', category: 'Variável', amount: 85, date: '2023-12-01', description: 'Alimentação Motorista' },
  { id: 'e4', vehicleId: 'v2', category: 'Variável', amount: 3200, date: '2023-11-15', description: 'Jogo de Pneus' },
  { id: 'e5', vehicleId: 'v3', category: 'Seguro', amount: 5000, date: '2023-01-10', description: 'Seguro Frota Anual' },
  { id: 'e6', freightId: 'f4', category: 'Variável', amount: 150.50, date: '2023-12-03', description: 'Pedágio' },
  { id: 'e7', category: 'Fixa', amount: 3500, date: '2023-12-01', description: 'Aluguel do Galpão' },
  { id: 'e8', category: 'Financiamento', amount: 4500, date: '2023-12-05', description: 'Parcela Caminhão Volvo' },
  { id: 'e9', category: 'Imposto', amount: 1200, date: '2023-12-10', description: 'DAS Simples Nacional' },
  { id: 'e10', category: 'Fixa', amount: 150, date: '2023-12-02', description: 'Internet e Telefone' },
];

// --- Maintenances ---
export const mockMaintenances: Maintenance[] = [
  { id: 'm1', vehicleId: 'ABC-1234', workshop: 'Oficina do Tião', type: 'Preventiva', date: '2023-12-10', cost: 450.00, description: 'Troca de Óleo e Filtros', status: 'Concluída' },
  { id: 'm2', vehicleId: 'XYZ-9876', workshop: 'Truck Center SP', type: 'Corretiva', date: '2023-12-15', cost: 1200.00, description: 'Troca de Pastilhas de Freio', status: 'Agendada' },
  { id: 'm3', vehicleId: 'DEF-5678', workshop: 'Mecânica Diesel Pro', type: 'Corretiva', date: '2023-12-12', cost: 2500.00, description: 'Reparo no Câmbio', status: 'Em Andamento' },
];

// --- Documents ---
export const mockDocuments: Document[] = [
  { id: 'doc1', title: 'Seguro Obrigatório', type: 'Seguro', entityId: 'ABC-1234', entityType: 'Veículo', expiryDate: '2024-01-15', status: 'A Vencer' },
  { id: 'doc4', title: 'Licenciamento 2024', type: 'Licença', entityId: 'ABC-1234', entityType: 'Veículo', expiryDate: '2024-06-15', status: 'Válido' },
  { id: 'doc2', title: 'CNH Motorista', type: 'Licença', entityId: 'Roberto Silva', entityType: 'Motorista', expiryDate: '2024-05-20', status: 'Válido' },
  { id: 'doc3', title: 'IPVA 2024', type: 'IPVA', entityId: 'XYZ-9876', entityType: 'Veículo', expiryDate: '2023-11-20', status: 'Vencido' },
];

// --- Carriers (Admin View) ---
export const mockCarriers: Carrier[] = [
  { id: 'c1', name: 'TransRapid Logística', cnpj: '12.345.678/0001-90', plan: 'Empresarial', status: 'Ativo', joinedAt: '2023-01-10' },
  { id: 'c2', name: 'FastWay Transportes', cnpj: '98.765.432/0001-10', plan: 'Profissional', status: 'Ativo', joinedAt: '2023-03-15' },
  { id: 'c3', name: 'BlueSky Cargas', cnpj: '11.223.344/0001-55', plan: 'Básico', status: 'Bloqueado', joinedAt: '2023-06-20' },
  { id: 'c4', name: 'Rota Sul Transportes', cnpj: '44.555.666/0001-22', plan: 'Profissional', status: 'Ativo', joinedAt: '2023-08-05' },
  { id: 'c5', name: 'NorteLog', cnpj: '77.888.999/0001-33', plan: 'Básico', status: 'Ativo', joinedAt: '2023-09-12' },
];

// --- Users (Admin View) ---
export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin Master', email: 'admin@logi.com', role: 'ADMIN', status: 'Ativo', lastLogin: '2023-12-05 10:30' },
  { id: 'u2', name: 'João Transportador', email: 'joao@transrapid.com', role: 'CLIENT', status: 'Ativo', lastLogin: '2023-12-05 08:15' },
  { id: 'u3', name: 'Maria Logística', email: 'maria@fastway.com', role: 'CLIENT', status: 'Ativo', lastLogin: '2023-12-04 14:20' },
  { id: 'u4', name: 'Pedro Bloqueado', email: 'pedro@bluesky.com', role: 'CLIENT', status: 'Inativo', lastLogin: '2023-11-20 09:00' },
];

// --- Webhooks ---
export const mockWebhooks: Webhook[] = [
  { id: 'w1', url: 'https://api.transrapid.com/hooks/freight', event: 'freight.created', status: 'Ativo', lastTriggered: '2023-12-05 10:00' },
  { id: 'w2', url: 'https://erp.fastway.com/sync', event: 'invoice.paid', status: 'Falha', lastTriggered: '2023-12-04 15:30' },
];

// --- Invoices ---
export const mockInvoices: Invoice[] = [
  { id: 'i1', carrierName: 'TransRapid Logística', amount: 499.00, status: 'Pago', dueDate: '2023-12-01' },
  { id: 'i2', carrierName: 'FastWay Transportes', amount: 199.00, status: 'Pendente', dueDate: '2023-12-10' },
  { id: 'i3', carrierName: 'BlueSky Cargas', amount: 99.00, status: 'Atrasado', dueDate: '2023-11-20' },
  { id: 'i4', carrierName: 'Rota Sul Transportes', amount: 199.00, status: 'Pago', dueDate: '2023-12-05' },
];

// --- KPIs ---
export const clientKPIs: KPI[] = [
  { label: 'Lucro Líquido', value: 15400, change: 12.5, isCurrency: true },
  { label: 'Fretes Ativos', value: 8, change: 5, isCurrency: false },
  { label: 'A Receber', value: 22000, change: -2.3, isCurrency: true },
  { label: 'A Pagar', value: 6500, change: 1.1, isCurrency: true },
];

export const adminKPIs: KPI[] = [
  { label: 'Receita Mensal', value: 125000, change: 8.4, isCurrency: true },
  { label: 'Transp. Ativas', value: 142, change: 15, isCurrency: false },
  { label: 'Novos Usuários', value: 24, change: 4.2, isCurrency: false },
  { label: 'Taxa de Churn', value: '1.2%', change: -0.5, isCurrency: false },
];

// --- Plans ---
export const mockPlans = [
  { name: 'Básico', price: 99, features: ['5 Veículos', 'Relatórios Básicos', 'Suporte por Email'] },
  { name: 'Profissional', price: 199, features: ['20 Veículos', 'Analytics Avançado', 'Suporte Prioritário', 'Otimização de Rotas'] },
  { name: 'Empresarial', price: 499, features: ['Veículos Ilimitados', 'Gerente Dedicado', 'Acesso à API', 'Integrações Customizadas'] },
];
