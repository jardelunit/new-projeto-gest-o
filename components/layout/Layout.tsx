
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Package, 
  DollarSign, 
  LogOut, 
  Menu, 
  X,
  PieChart,
  FileText,
  Building,
  Webhook,
  Wrench,
  FileBarChart,
  Activity,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminLinks = [
    { name: 'Visão Geral', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Transportadoras', path: '/admin/carriers', icon: <Truck size={20} /> },
    { name: 'Usuários', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Planos', path: '/admin/plans', icon: <FileText size={20} /> },
    { name: 'Webhooks', path: '/admin/webhooks', icon: <Webhook size={20} /> },
    { name: 'Financeiro', path: '/admin/financial', icon: <DollarSign size={20} /> },
  ];

  const clientLinks = [
    { name: 'Visão Geral', path: '/client', icon: <LayoutDashboard size={20} /> },
    {
      name: 'Frota',
      path: '/client/fleet?tab=overview',
      icon: <Truck size={20} />,
      children: [
        { name: 'Visão Geral', path: '/client/fleet?tab=overview', icon: <Activity size={18} /> },
        { name: 'Veículos', path: '/client/fleet?tab=vehicles', icon: <Truck size={18} /> },
        { name: 'Documentos', path: '/client/fleet?tab=docs', icon: <FileText size={18} /> },
        { name: 'Manutenções', path: '/client/fleet?tab=maintenance', icon: <Wrench size={18} /> },
        { name: 'Relatório', path: '/client/fleet?tab=report', icon: <BarChart3 size={18} /> },
      ],
    },
    { name: 'Despesas', path: '/client/expenses', icon: <PieChart size={20} /> },
    { name: 'Fretes', path: '/client/freights', icon: <Package size={20} /> },
    { name: 'Financeiro', path: '/client/financial', icon: <DollarSign size={20} /> },
    { name: 'Motoristas', path: '/client/drivers', icon: <Users size={20} /> },
    { name: 'Relatórios', path: '/client/reports', icon: <FileBarChart size={20} /> },
  ];

  const links = role === 'ADMIN' ? adminLinks : clientLinks;
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isExactMatch = (target: string) => `${location.pathname}${location.search}` === target;
  const isPathMatch = (target: string) => {
    const [targetPath] = target.split('?');
    return location.pathname === targetPath;
  };

  const handleGroupClick = (path: string, hasActiveChild: boolean) => {
    navigate(path);
    if (window.innerWidth < 1024) onClose();
    setOpenGroups((prev) => ({ ...prev, [path]: hasActiveChild ? true : !prev[path] }));
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm lg:w-64 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <Building className="text-blue-500 mr-2" size={24} />
            <span className="text-xl font-bold text-slate-100">LogiMaster</span>
            <button className="ml-auto lg:hidden text-slate-400" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-5 space-y-1 overflow-y-auto overscroll-contain pb-16">
            {links.map((link) => {
              const isActive = isExactMatch(link.path) || isPathMatch(link.path);

              if (link.children) {
                const hasActiveChild = link.children.some((child) => isExactMatch(child.path));
                const open = openGroups[link.path] ?? hasActiveChild;

                return (
                  <div key={link.path} className="space-y-1">
                    <button
                      onClick={() => handleGroupClick(link.path, hasActiveChild)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors min-w-0 ${
                        isActive || hasActiveChild
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0">{link.icon}</span>
                        <span className="truncate">{link.name}</span>
                      </span>
                      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {open && (
                      <div className="ml-6 md:ml-7 border-l border-slate-800/60 pl-3 space-y-1">
                        {link.children.map((child) => {
                          const childActive = isExactMatch(child.path);
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => window.innerWidth < 1024 && onClose()}
                              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors min-w-0 ${
                                childActive
                                  ? 'bg-blue-500/10 text-blue-100'
                                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                              }`}
                            >
                              <span className="mr-3 text-slate-300 shrink-0">{child.icon}</span>
                              <span className="truncate">{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors min-w-0
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`}
                >
                  <span className="mr-3 shrink-0">{link.icon}</span>
                  <span className="truncate">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-slate-800">
             <div className="flex items-center mb-4 px-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                    {role === 'ADMIN' ? 'A' : 'C'}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-slate-200">{role === 'ADMIN' ? 'Admin User' : 'Transportadora'}</p>
                    <p className="text-xs text-slate-500">{role === 'ADMIN' ? 'admin@logi.com' : 'ops@transco.com'}</p>
                </div>
             </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode; role: UserRole }> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Sidebar role={role} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-semibold text-lg">LogiMaster</span>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
