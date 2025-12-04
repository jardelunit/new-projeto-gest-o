// # Contexto: hook de gestão de despesas.
// # Responsabilidades: filtrar lista por termo/categoria/período, calcular indicadores e controlar modal de criação.

import { FormEvent, useMemo, useState } from 'react';
import { Expense } from '../../../../types';
import { getExpenses } from '../services/expensesService';
import { isExpenseValid } from '../utils/validators';

type CategoryOption = { value: string; label: string };

const expenseCategories: CategoryOption[] = [
  { value: 'Variável', label: 'Variável (Combustível, Pedágio)' },
  { value: 'Fixa', label: 'Fixa (Aluguel, Pessoal)' },
  { value: 'Imposto', label: 'Imposto' },
  { value: 'Financiamento', label: 'Financiamento' },
  { value: 'Seguro', label: 'Seguro' }
];

const createInitialExpense = (): Partial<Expense> => ({
  description: '',
  category: 'Variável',
  amount: 0,
  date: new Date().toISOString().split('T')[0]
});

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => getExpenses());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>(createInitialExpense());

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
      const matchesDate =
        (!startDate || expense.date >= startDate) && (!endDate || expense.date <= endDate);

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [expenses, searchTerm, categoryFilter, startDate, endDate]);

  const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const averageExpense = totalExpenses / (filteredExpenses.length || 1);
  const maxExpense = Math.max(...filteredExpenses.map(expense => expense.amount), 0);

  const chartData = useMemo(() => {
    const data: Record<string, number> = {};

    filteredExpenses.forEach(expense => {
      data[expense.category] = (data[expense.category] || 0) + expense.amount;
    });

    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [filteredExpenses]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const resetNewExpense = () => setNewExpense(createInitialExpense());

  const handleAddExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isExpenseValid(newExpense)) return;

    const expense: Expense = {
      id: `e${Date.now()}`,
      description: newExpense.description || '',
      category: newExpense.category || 'Variável',
      amount: newExpense.amount || 0,
      date: newExpense.date || ''
    };

    setExpenses(prevExpenses => [expense, ...prevExpenses]);
    closeModal();
    resetNewExpense();
  };

  return {
    averageExpense,
    categories: expenseCategories,
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
  };
};

export default useExpenses;
