import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { PersonType } from '../../types/people';

interface DocumentFormProps {
  personType: PersonType;
}

const getDocumentTypes = (personType: PersonType) => {
  const commonTypes = [
    { id: '1', name: 'RG', code: 'RG' },
    { id: '2', name: 'CNH', code: 'CNH' },
  ];

  const specificTypes = {
    FISICA: [
      { id: '3', name: 'CPF', code: 'CPF' },
      { id: '4', name: 'Título de Eleitor', code: 'TITULO' },
    ],
    JURIDICA: [
      { id: '5', name: 'CNPJ', code: 'CNPJ' },
      { id: '6', name: 'Inscrição Estadual', code: 'IE' },
      { id: '7', name: 'Inscrição Municipal', code: 'IM' },
      { id: '8', name: 'SUFRAMA', code: 'SUFRAMA' },
    ],
    PRODUTOR_RURAL: [
      { id: '9', name: 'Inscrição Estadual', code: 'IE' },
      { id: '10', name: 'INCRA', code: 'INCRA' },
    ],
  };

  return [...commonTypes, ...specificTypes[personType]];
};

const DocumentForm: React.FC<DocumentFormProps> = ({ personType }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const documentTypes = getDocumentTypes(personType);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Documentos</h3>
        <button
          type="button"
          onClick={() => append({ isMain: fields.length === 0 })}
          className="btn-secondary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Documento
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Documento
              </label>
              <select
                {...register(`documents.${index}.typeId`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {documentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número
              </label>
              <input
                type="text"
                {...register(`documents.${index}.number`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Validade
              </label>
              <input
                type="date"
                {...register(`documents.${index}.expirationDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`documents.${index}.isMain`)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Documento Principal
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

export default DocumentForm;