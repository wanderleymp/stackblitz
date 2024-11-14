import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import People from './pages/People';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      queryFn: () => ({
        // Mock data for demonstration
        users: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            company: 'Example Corp',
            role: 'Admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          // Add more mock users as needed
        ],
        financialMetrics: {
          revenue: 125000,
          expenses: 42500,
          users: 1234,
          growth: 22
        },
        revenueHistory: [
          { month: 'Jan', value: 65000, growth: 15 },
          { month: 'Fev', value: 72000, growth: 18 },
          { month: 'Mar', value: 85000, growth: 20 },
          { month: 'Abr', value: 95000, growth: 22 },
          { month: 'Mai', value: 105000, growth: 24 },
          { month: 'Jun', value: 125000, growth: 28 },
        ]
      })
    }
  }
});

const PrivateRoute = ({ children }) => (
  <div className="flex min-h-screen bg-blue-50">
    <Sidebar />
    <div className="flex-1 ml-64">
      <Header />
      <main className="mt-16 p-6">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/people"
            element={
              <PrivateRoute>
                <People />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;