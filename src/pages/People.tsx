import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import PersonForm from '../components/People/PersonForm';
import { Person } from '../types/people';

const People = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Mock data for demonstration
  const mockPeople: Person[] = [
    {
      id: '1',
      type: 'JURIDICA',
      name: 'Empresa Exemplo LTDA',
      tradeName: 'Exemplo Corp',
      addresses: [
        {
          id: '1',
          street: 'Rua Teste',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          isMain: true,
        },
      ],
      contacts: [
        {
          id: '1',
          type: 'EMAIL',
          value: 'contato@exemplo.com',
          isMain: true,
        },
      ],
      documents: [
        {
          id: '1',
          typeId: '5',
          number: '12.345.678/0001-90',
          isMain: true,
        },
      ],
      relationships: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const handleSubmit = async (data: Person) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Nova Pessoa
          </h2>
          <PersonForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Pessoas</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Pessoa
            </button>
          </div>

          <div className="card p-6">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar pessoas..."
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
                    <th>Tipo</th>
                    <th>Documento Principal</th>
                    <th>Contato Principal</th>
                    <th>Cidade/UF</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPeople.map((person) => {
                    const mainAddress = person.addresses.find((a) => a.isMain);
                    const mainContact = person.contacts.find((c) => c.isMain);
                    const mainDocument = person.documents.find((d) => d.isMain);

                    return (
                      <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.type}</td>
                        <td>{mainDocument?.number}</td>
                        <td>{mainContact?.value}</td>
                        <td>
                          {mainAddress
                            ? `${mainAddress.city}/${mainAddress.state}`
                            : '-'}
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              Editar
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default People;