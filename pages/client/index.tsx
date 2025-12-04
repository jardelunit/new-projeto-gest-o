// # Contexto: painel do cliente montando rotas dentro do DashboardLayout.
// # Responsabilidades: define caminhos principais e redireciona abas legadas de manutenção/documentos.

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/Layout';
import Overview from './Overview';
import Fleet from './Fleet';
import Freights from './Freights';
import Drivers from './Drivers';
import Expenses from './Expenses';
import Financial from './Financial';
import Reports from './Reports';

const ClientDashboard: React.FC = () => {
  return (
    <DashboardLayout role="CLIENT">
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/freights" element={<Freights />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/maintenances" element={<Navigate to="/client/fleet?tab=maintenance" replace />} />
        <Route path="/documents" element={<Navigate to="/client/fleet?tab=docs" replace />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ClientDashboard;
