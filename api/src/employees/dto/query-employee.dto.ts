import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';

export class QueryEmployeeDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Limite de resultados por página',
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    example: '01001000',
    description: 'Filtrar por CEP',
  })
  @IsOptional()
  cep?: string;

  @ApiPropertyOptional({
    example: '2023-01-01',
    description: 'Data de admissão inicial (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Data de admissão final (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
