import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EmployeeDocument = HydratedDocument<Employee>

@Schema()
export class Employee {
  @ApiProperty()
  @Prop({ required: true })
  admissionDate: Date;

  @ApiProperty()
  @Prop({ required: true })
  grossSalary: number;

  @ApiProperty()
  @Prop({ required: true })
  cep: string;

  @ApiProperty()
  @Prop({ type: Object })
  dateDifference: {
    years: number;
    months: number;
    days: number;
  };

  @ApiProperty()
  @Prop()
  calculatedValue: number;

  @ApiProperty()
  @Prop({ type: Object })
  address: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
