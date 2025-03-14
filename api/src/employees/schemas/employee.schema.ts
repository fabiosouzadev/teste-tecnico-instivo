import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Employee extends Document {
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
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
