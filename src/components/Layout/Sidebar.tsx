import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Key,
  LogOut,
  Settings,
  UserCircle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Usuários', path: '/users' },
    { icon: UserCircle, label: 'Pessoas', path: '/people' },
    { icon: Building2, label: 'Empresas', path: '/companies' },
    { icon: Key, label: 'Licenças', path: '/licenses' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-blue-900 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white">FinancePro</h1>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-2 text-gray-300 rounded-lg hover:bg-blue-800 transition-colors ${
                  isActive ? 'bg-blue-800 text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-blue-800 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;