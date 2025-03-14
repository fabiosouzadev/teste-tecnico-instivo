import { IsDateString, IsPositive, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    example: '2020-01-01',
    description: 'Data de admissão no formato YYYY-MM-DD'
  })
  @IsDateString()
  admissionDate: Date;

  @ApiProperty({
    example: 5000,
    description: 'Valor do salário bruto'
  })
  @IsPositive()
  grossSalary: number;

  @ApiProperty({
    example: '01001000',
    description: 'CEP com 8 dígitos (sem traço)'
  })
  @Length(8, 8)
  cep: string;
}
