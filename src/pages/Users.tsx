import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Plus, Search, Edit, Trash } from 'lucide-react';
import { users } from '../lib/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Users = () => {
  const [search, setSearch] = useState('');
  const { data: usersList } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    // @ts-ignore
    doc.autoTable({
      head: [['Nome', 'Email', 'Empresa', 'Cargo']],
      body: usersList?.map(user => [
        user.name,
        user.email,
        user.company,
        user.role
      ]) || [],
    });
    doc.save('usuarios.pdf');
  };

  const filteredUsers = usersList?.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
        <div className="flex space-x-3">
          <button
            onClick={generatePDF}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-primary pl-10 w-full"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
              {filteredUsers?.map((user) => (
                <tr key={user.id}>
                  <td className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.company}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-blue-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded">
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;