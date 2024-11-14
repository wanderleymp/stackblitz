import axios from 'axios';

interface CNPJResponse {
  razao_social: string;
  nome_fantasia: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
}

export const searchCNPJ = async (cnpj: string): Promise<CNPJResponse> => {
  // For testing purposes, we'll return mock data
  // In production, you would integrate with a real CNPJ API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        razao_social: 'Empresa Teste LTDA',
        nome_fantasia: 'Teste Company',
        logradouro: 'Rua Exemplo',
        numero: '123',
        complemento: 'Sala 456',
        bairro: 'Centro',
        municipio: 'São Paulo',
        uf: 'SP',
        cep: '01234-567',
      });
    }, 1000);
  });
};