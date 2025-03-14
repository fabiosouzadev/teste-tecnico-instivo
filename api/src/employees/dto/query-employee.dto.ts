import { 
  ApiPropertyOptional, 
  ApiProperty 
} from '@nestjs/swagger';
import { 
  IsOptional, 
  IsInt, 
  Min, 
  Max, 
  IsDateString, 
  Length 
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryEmployeeDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
    default: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de resultados por página',
    default: 10,
    maximum: 100
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiPropertyOptional({
    example: '01001000',
    description: 'Filtrar por CEP (8 dígitos)'
  })
  @IsOptional()
  @Length(8, 8, { message: 'CEP deve ter exatamente 8 dígitos' })
  cep?: string;

  @ApiPropertyOptional({
    example: '2020-01-01',
    description: 'Data de admissão inicial (YYYY-MM-DD)'
  })
  @IsOptional()
  @IsDateString({ strict: true })
  startDate?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Data de admissão final (YYYY-MM-DD)'
  })
  @IsOptional()
  @IsDateString({ strict: true })
  endDate?: string;

  @ApiProperty({
    description: 'Ordenação dos resultados',
    enum: ['asc', 'desc'],
    default: 'desc'
  })
  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  sort?: 'asc' | 'desc' = 'desc';
}
