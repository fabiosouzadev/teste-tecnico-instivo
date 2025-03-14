import { IsDateString, IsPositive, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsDateString()
  admissionDate: Date;

  @IsPositive()
  grossSalary: number;

  @Length(8, 8)
  cep: string;
}
