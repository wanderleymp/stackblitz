import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { dashboard } from '../lib/api';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ml-1 ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trendValue}
          </span>
        </div>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { data: metrics } = useQuery({
    queryKey: ['financialMetrics'],
    queryFn: dashboard.getFinancialMetrics,
  });

  const { data: revenueHistory } = useQuery({
    queryKey: ['revenueHistory'],
    queryFn: dashboard.getRevenueHistory,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Receita Total"
          value="R$ 125.000"
          icon={DollarSign}
          trend="up"
          trendValue="12% vs último mês"
        />
        <StatCard
          title="Despesas"
          value="R$ 42.500"
          icon={CreditCard}
          trend="down"
          trendValue="5% vs último mês"
        />
        <StatCard
          title="Usuários Ativos"
          value="1,234"
          icon={Users}
          trend="up"
          trendValue="8% vs último mês"
        />
        <StatCard
          title="Crescimento"
          value="22%"
          icon={TrendingUp}
          trend="up"
          trendValue="2% vs último mês"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Receita Mensal</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Tendência de Crescimento</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;