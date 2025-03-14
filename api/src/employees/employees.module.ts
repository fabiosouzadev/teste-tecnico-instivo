import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { EmployeesController } from './controllers/employees.controller';
import { EmployeesService } from './services/employees.service';
import { ViaCepService } from './services/viacep.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    HttpModule,
    CacheModule.register(),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, ViaCepService],
})
export class EmployeesModule {}
