import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createCalculation = async (data: {
  admissionDate: string;
  grossSalary: number;
  cep: string;
}) => {
  const response = await api.post('/calculations', data);
  return response.data;
};

export const getCalculation = async (id: string) => {
  const response = await api.get(`/calculations/${id}`);
  return response.data;
};
