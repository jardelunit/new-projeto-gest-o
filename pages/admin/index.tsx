
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/Layout';
import Overview from './Overview';
import Carriers from './Carriers';
import Users from './Users';
import Plans from './Plans';
import Webhooks from './Webhooks';
import Financial from './Financial';

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout role="ADMIN">
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/carriers" element={<Carriers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/webhooks" element={<Webhooks />} />
        <Route path="/financial" element={<Financial />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
