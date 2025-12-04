
export type UserRole = 'ADMIN' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'Ativo' | 'Inativo';
  lastLogin: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: number;
  currentKm: number;
  status: 'Disponível' | 'Em Trânsito' | 'Manutenção';
  driverId: string;
  lastMaintenance: string;
}

export interface Driver {
  id: string;
  name: string;
  cnh: string;
  cnhExpiry: string; // Novo
  cnhCategory: 'C' | 'D' | 'E'; // Novo
  phone: string; // Novo
  status: 'Ativo' | 'De Licença' | 'Férias';
  avatar?: string;
}

export interface Fine {
  id: string;
  driverId: string;
  date: string;
  amount: number;
  points: number;
  description: string;
  status: 'Paga' | 'Pendente';
}

export interface Freight {
  id: string;
  origin: string;
  destination: string;
  value: number;
  status: 'Pendente' | 'Em Progresso' | 'Entregue' | 'Cancelado';
  date: string;
  vehicleId?: string;
  driverId?: string; // Novo: vínculo direto para histórico
}

export interface Expense {
  id: string;
  vehicleId?: string;
  driverId?: string; // Novo: vínculo com motorista
  freightId?: string; // Novo: vínculo com frete específico
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string; 
  workshop: string;
  type: 'Preventiva' | 'Corretiva';
  date: string;
  cost: number;
  description: string;
  status: 'Agendada' | 'Concluída' | 'Em Andamento';
}

export interface Document {
  id: string;
  title: string;
  type: 'Licença' | 'Seguro' | 'IPVA' | 'Outro';
  entityId: string; 
  entityType: 'Veículo' | 'Motorista';
  expiryDate: string;
  status: 'Válido' | 'A Vencer' | 'Vencido';
}

export interface Carrier {
  id: string;
  name: string;
  cnpj: string;
  plan: 'Básico' | 'Profissional' | 'Empresarial';
  status: 'Ativo' | 'Bloqueado';
  joinedAt: string;
}

export interface KPI {
  label: string;
  value: string | number;
  change: number; 
  isCurrency?: boolean;
}

export interface Webhook {
  id: string;
  url: string;
  event: string;
  status: 'Ativo' | 'Falha';
  lastTriggered: string;
}

export interface Invoice {
  id: string;
  carrierName: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  dueDate: string;
}