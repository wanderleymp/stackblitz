import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

const contactTypes = [
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Telefone' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'LINKEDIN', label: 'LinkedIn' },
];

const ContactForm = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Contatos</h3>
        <button
          type="button"
          onClick={() => append({ isMain: fields.length === 0 })}
          className="btn-secondary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Contato
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Contato
              </label>
              <select
                {...register(`contacts.${index}.type`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {contactTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <input
                type="text"
                {...register(`contacts.${index}.value`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <input
                type="text"
                {...register(`contacts.${index}.description`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`contacts.${index}.isMain`)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Contato Principal
                </span>
              </label>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactForm;