// # Contexto: filtros de despesas.
// # Responsabilidades: permitir busca, seleção de categoria e intervalo de datas.

import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Input, Select } from '../../../../components/ui/Common';

type CategoryOption = { value: string; label: string };

type ExpensesFiltersProps = {
  categories: CategoryOption[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

const ExpensesFilters: React.FC<ExpensesFiltersProps> = ({
  categories,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <Filter size={16} className="text-blue-500" />
      <h3 className="font-semibold text-white">Filtros</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Buscar descrição..."
          className="pl-10"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <Select
        options={categories}
        value={categoryFilter}
        onChange={e => onCategoryChange(e.target.value)}
        className="w-full"
      />
      <div className="flex gap-2">
        <Input type="date" value={startDate} onChange={e => onStartDateChange(e.target.value)} />
        <Input type="date" value={endDate} onChange={e => onEndDateChange(e.target.value)} />
      </div>
    </div>
  </div>
);

export default ExpensesFilters;
