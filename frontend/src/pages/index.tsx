import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import CalculationForm from '../components/CalculationForm';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: {
    admissionDate: string;
    grossSalary: string;
    cep: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao processar dados');
      
      const result = await response.json();
      router.push(`/results/${result.id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">
        Calculadora de Benefícios
      </h1>
      <CalculationForm 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
}
