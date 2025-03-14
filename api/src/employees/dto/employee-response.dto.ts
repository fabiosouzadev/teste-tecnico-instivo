import { ApiProperty } from '@nestjs/swagger';

export class PaginatedEmployeeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Número da página atual',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Limite de resultados por página',
  })
  limit: number;

  @ApiProperty({
    example: 100,
    description: 'Total de registros encontrados',
  })
  total: number;

  @ApiProperty({
    type: () => [EmployeeResponseDto],
    description: 'Array de resultados',
  })
  data: EmployeeResponseDto[];
}

export class EmployeeResponseDto {
  @ApiProperty({
    example: '65f8e4b75e1bf5c01f48e9a3',
    description: 'ID único do cálculo',
  })
  _id: string;

  @ApiProperty({
    example: '2020-01-01',
    description: 'Data de admissão',
  })
  admissionDate: Date;

  @ApiProperty({
    example: 5000,
    description: 'Salário bruto',
  })
  grossSalary: number;

  @ApiProperty({
    example: '01001000',
    description: 'CEP consultado',
  })
  cep: string;

  @ApiProperty({
    example: { years: 3, months: 5, days: 12 },
    description: 'Diferença temporal calculada',
  })
  dateDifference: {
    years: number;
    months: number;
    days: number;
  };

  @ApiProperty({
    example: 1750,
    description: '35% do salário bruto',
  })
  calculatedValue: number;

  @ApiProperty({
    example: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    },
    description: 'Dados completos do endereço',
  })
  address: Record<string, any>;

  @ApiProperty({
    example: '2024-03-19T12:00:00.000Z',
    description: 'Data de criação do registro',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-19T12:00:00.000Z',
    description: 'Data da última atualização',
  })
  updatedAt: Date;
}
