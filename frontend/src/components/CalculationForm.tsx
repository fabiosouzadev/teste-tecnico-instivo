import { useState } from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';

interface CalculationFormProps {
  onSubmit: (data: {
    admissionDate: string;
    grossSalary: string;
    cep: string;
  }) => void;
  loading: boolean;
}

const CalculationForm: React.FC<CalculationFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<({
    admissionDate: string,
    grossSalary: string,
    cep: string,
  })>({
    admissionDate: '',
    grossSalary: '',
    cep: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cep' ? value.replace(/\D/g, '') : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          <FiCalendar className="inline mr-2" />
          Data de Admissão
        </label>
        <input
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          <FiDollarSign className="inline mr-2" />
          Salário Bruto (R$)
        </label>
        <input
          type="number"
          step="0.01"
          name="grossSalary"
          value={formData.grossSalary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          <FiMapPin className="inline mr-2" />
          CEP
        </label>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="00000000"
          pattern="\d{8}"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
    </form>
  );
}
