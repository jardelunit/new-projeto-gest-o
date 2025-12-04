// # Contexto: módulo de despesas.
// # Responsabilidades: exibir KPIs, filtros, gráfico, tabela e modal para lançar novas despesas.

import React from 'react';
import { Expense } from '../../../types';
import ExpensesChart from './components/ExpensesChart';
import ExpensesFilters from './components/ExpensesFilters';
import ExpensesHeader from './components/ExpensesHeader';
import ExpensesKPIs from './components/ExpensesKPIs';
import ExpensesTable from './components/ExpensesTable';
import CreateExpenseModal from './modals/CreateExpenseModal';
import useExpenses from './hooks/useExpenses';

const Expenses: React.FC = () => {
  const {
    averageExpense,
    categories,
    categoryFilter,
    chartData,
    closeModal,
    endDate,
    filteredExpenses,
    handleAddExpense,
    isModalOpen,
    maxExpense,
    newExpense,
    openModal,
    searchTerm,
    setCategoryFilter,
    setEndDate,
    setNewExpense,
    setSearchTerm,
    setStartDate,
    startDate,
    totalExpenses
  } = useExpenses();

  const handleChangeExpenseField = (field: keyof Expense, value: string | number) => {
    setNewExpense(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <ExpensesHeader onAddExpense={openModal} />

      <ExpensesKPIs
        totalExpenses={totalExpenses}
        averageExpense={averageExpense}
        maxExpense={maxExpense}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpensesChart data={chartData} />

        <div className="lg:col-span-2 space-y-6">
          <ExpensesFilters
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <ExpensesTable data={filteredExpenses} />
        </div>
      </div>

      <CreateExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        categories={categories}
        newExpense={newExpense}
        onSubmit={handleAddExpense}
        onChangeField={handleChangeExpenseField}
      />
    </div>
  );
};

export default Expenses;
