import React from 'react';
import { Bell, User } from 'lucide-react';
import { Menu } from '@headlessui/react';

const Header = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#profile"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Seu Perfil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#settings"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Configurações
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;