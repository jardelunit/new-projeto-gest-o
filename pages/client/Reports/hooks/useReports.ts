// # Contexto: hook de relatórios.
// # Responsabilidades: controlar filtros (datas, entidade, tipo), preparar datasets mock e orquestrar exportação.

import { useMemo, useState } from 'react';
import { Driver, Expense, Freight, Vehicle } from '../../../../types';
import {
  exportReport,
  getDrivers,
  getExpenses,
  getFreights,
  getVehicles,
  ReportExportType
} from '../services/reportsService';
import { isDateWithinRange } from '../utils/validators';

export type ReportType =
  | 'freights_period'
  | 'expenses_vehicle'
  | 'profit_comparison'
  | 'driver_performance'
  | 'financial_summary';

export type ReportOption = { value: ReportType; label: string };

export type DriverPerformance = Driver & { totalValue: number; trips: number };

export type ProfitSummary = { id: string; revenue: number; expense: number; profit: number; period: string };

type ReportData = Freight[] | Expense[] | DriverPerformance[] | ProfitSummary[];

export const useReports = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('freights_period');
  const [startDate, setStartDate] = useState('2023-11-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const freights = useMemo(getFreights, []);
  const expenses = useMemo(getExpenses, []);
  const vehicles = useMemo(getVehicles, []);
  const drivers = useMemo(getDrivers, []);

  const reportOptions: ReportOption[] = useMemo(
    () => [
      { value: 'freights_period', label: 'Fretes por Período' },
      { value: 'expenses_vehicle', label: 'Gastos por Veículo' },
      { value: 'profit_comparison', label: 'Comparativo de Lucro' },
      { value: 'driver_performance', label: 'Performance de Motoristas' },
      { value: 'financial_summary', label: 'Relatório Financeiro Geral' }
    ],
    []
  );

  const reportData = useMemo<ReportData>(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isWithinRange = (dateStr: string) => isDateWithinRange(dateStr, start, end);

    switch (selectedReport) {
      case 'freights_period':
        return freights.filter(freight => isWithinRange(freight.date));

      case 'expenses_vehicle':
        return expenses.filter(expense => {
          const isVehicleMatch = selectedEntityId ? expense.vehicleId === selectedEntityId : true;
          return isWithinRange(expense.date) && expense.vehicleId && isVehicleMatch;
        });

      case 'driver_performance':
        return drivers
          .map(driver => {
            const driverFreights = freights.filter(
              freight => freight.driverId === driver.id && isWithinRange(freight.date)
            );

            const totalValue = driverFreights.reduce((acc, curr) => acc + curr.value, 0);
            const trips = driverFreights.length;

            if (selectedEntityId && driver.id !== selectedEntityId) return null;

            return { ...driver, totalValue, trips };
          })
          .filter((driver): driver is DriverPerformance => Boolean(driver));

      case 'profit_comparison':
      case 'financial_summary': {
        const revenue = freights
          .filter(freight => isWithinRange(freight.date))
          .reduce((acc, freight) => acc + freight.value, 0);
        const expense = expenses
          .filter(expense => isWithinRange(expense.date))
          .reduce((acc, expense) => acc + expense.amount, 0);

        return [
          {
            id: 'summary',
            revenue,
            expense,
            profit: revenue - expense,
            period: `${startDate} a ${endDate}`
          }
        ];
      }

      default:
        return [];
    }
  }, [drivers, expenses, freights, selectedEntityId, selectedReport, startDate, endDate]);

  const handleReportChange = (report: ReportType) => {
    setSelectedReport(report);
    setSelectedEntityId('');
  };

  const handleExport = async (type: ReportExportType) => {
    setIsExporting(true);
    await exportReport(type);
    setIsExporting(false);
    alert(`Relatório exportado em ${type} com sucesso!`);
  };

  return {
    drivers,
    endDate,
    handleExport,
    handleReportChange,
    isExporting,
    reportData,
    reportOptions,
    selectedEntityId,
    selectedReport,
    setEndDate,
    setSelectedEntityId,
    setStartDate,
    startDate,
    vehicles
  };
};

export default useReports;
