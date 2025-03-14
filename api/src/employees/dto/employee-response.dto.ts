import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';

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
  salarioBruto: number;

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
  endereco: Record<string, any>;

  @ApiProperty({
    example: '2024-03-19T12:00:00.000Z',
    description: 'Data de criação do registro',
  })
  createdAt: Date;

  // @ApiProperty({
  //   example: '2024-03-19T12:00:00.000Z',
  //   description: 'Data da última atualização',
  // })
  // updatedAt: Date;
}

export class PaginatedEmployeeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Número da página atual',
    minimum: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page? : number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de resultados por página',
    minimum: 1,
    maximum: 100
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit? : number = 10;

  @ApiProperty({
    example: 100,
    description: 'Total de registros encontrados'
  })
  total: number;

  @ApiProperty({
    type: [EmployeeResponseDto],
    description: 'Array de cálculos',
    example: [
      {
        id: '65f8e4b75e1bf5c01f48e9a3',
        admissionDate: '2020-01-01',
        grossSalary: 5000,
        cep: '01001000',
        dateDifference: {
          years: 3,
          months: 5,
          days: 15
        },
        calculatedValue: 1750,
        address: {
          cep: '01001-000',
          logradouro: 'Praça da Sé',
          complemento: 'lado ímpar',
          bairro: 'Sé',
          localidade: 'São Paulo',
          uf: 'SP',
          ibge: '3550308',
          gia: '1004',
          ddd: '11',
          siafi: '7107'
        },
        createdAt: '2024-03-20T10:00:00.000Z',
        updatedAt: '2024-03-20T10:00:00.000Z'
      }
    ]
  })
  data: EmployeeResponseDto[];

  @ApiProperty({
    example: 10,
    description: 'Total de páginas disponíveis',
    required: false
  })
  totalPages?: number;

  @ApiProperty({
    example: false,
    description: 'Indica se existe página anterior',
    required: false
  })
  hasPrevPage?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indica se existe próxima página',
    required: false
  })
  hasNextPage?: boolean;
}



