import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import ResultCard from '../../components/ResultCard';

interface CalculationResult {
  admissionDate: string;
  grossSalary: number;
  calculatedValue: number;
  dateDifference: {
    years: number;
    months: number;
    days: number;
  };
  address: {
    logradouro: string;
    localidade: string;
    uf: string;
  };
}

export default function ResultPage() {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/calculations/${id}`);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        alert('Erro ao carregar resultados');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  if (!result) return <div className="text-center py-8">Nenhum resultado encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Resultados</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ResultCard
          icon={<FiClock className="text-blue-500" />}
          title="Tempo de Empresa"
          value={`${result.dateDifference.years} anos, ${result.dateDifference.months} meses e ${result.dateDifference.days} dias`}
        />

        <ResultCard
          icon={<FiDollarSign className="text-green-500" />}
          title="Valor Calculado"
          value={`R$ ${result.calculatedValue.toFixed(2)}`}
        />

        <ResultCard
          icon={<FiMapPin className="text-red-500" />}
          title="Localização"
          value={`${result.address.logradouro}, ${result.address.localidade} - ${result.address.uf}`}
        />
      </div>
    </div>
  );
}
