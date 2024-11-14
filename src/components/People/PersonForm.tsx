import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Person, PersonType } from '../../types/people';
import AddressForm from './AddressForm';
import ContactForm from './ContactForm';
import DocumentForm from './DocumentForm';
import { searchCNPJ } from '../../services/cnpj';
import { toast } from 'react-hot-toast';

const personSchema = z.object({
  type: z.enum(['FISICA', 'JURIDICA', 'PRODUTOR_RURAL']),
  name: z.string().min(3, 'Nome é obrigatório'),
  tradeName: z.string().optional(),
  birthDate: z.date().optional(),
  cnpj: z.string().optional(),
});

interface PersonFormProps {
  initialData?: Partial<Person>;
  onSubmit: (data: Person) => Promise<void>;
}

const PersonForm: React.FC<PersonFormProps> = ({ initialData, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(personSchema),
    defaultValues: initialData,
  });

  const personType = watch('type');

  const handleCNPJSearch = async (cnpj: string) => {
    try {
      setLoading(true);
      const data = await searchCNPJ(cnpj);
      setValue('name', data.razao_social);
      setValue('tradeName', data.nome_fantasia);
      toast.success('CNPJ encontrado com sucesso!');
    } catch (error) {
      toast.error('Erro ao buscar CNPJ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Pessoa
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="FISICA">Pessoa Física</option>
            <option value="JURIDICA">Pessoa Jurídica</option>
            <option value="PRODUTOR_RURAL">Produtor Rural</option>
          </select>
        </div>

        {personType === 'JURIDICA' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CNPJ
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                {...register('cnpj')}
                className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleCNPJSearch(watch('cnpj'))}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                Buscar
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {personType === 'JURIDICA' ? 'Razão Social' : 'Nome'}
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {personType === 'JURIDICA' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome Fantasia
            </label>
            <input
              type="text"
              {...register('tradeName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        {personType !== 'JURIDICA' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              type="date"
              {...register('birthDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <AddressForm />
      <ContactForm />
      <DocumentForm personType={personType as PersonType} />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default PersonForm;