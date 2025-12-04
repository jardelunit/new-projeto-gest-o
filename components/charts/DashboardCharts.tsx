import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card } from '../ui/Common';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl">
        <p className="text-slate-200 font-semibold mb-1">{label || payload[0].name}</p>
        <p className="text-blue-400 text-sm">
          {`Valor: R$ ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const expenseData = [
    { name: 'Seg', revenue: 4000, expenses: 2400 },
    { name: 'Ter', revenue: 3000, expenses: 1398 },
    { name: 'Qua', revenue: 2000, expenses: 9800 },
    { name: 'Qui', revenue: 2780, expenses: 3908 },
    { name: 'Sex', revenue: 1890, expenses: 4800 },
    { name: 'Sáb', revenue: 2390, expenses: 3800 },
    { name: 'Dom', revenue: 3490, expenses: 4300 },
];

export const RevenueChart: React.FC = () => {
  return (
    <Card title="Crescimento da Receita" className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const ProfitLossChart: React.FC = () => {
    return (
      <Card title="Receita vs Despesas" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b'}} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
};

interface ExpenseCategoryData {
  name: string;
  value: number;
}

export const ExpensesPieChart: React.FC<{ data: ExpenseCategoryData[] }> = ({ data }) => {
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <Card title="Despesas por Categoria" className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};