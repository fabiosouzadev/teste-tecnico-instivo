import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schemas/employee.schema';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { QueryEmployeeDto } from '../dto/query-employee.dto';
import {
  EmployeeResponseDto,
  PaginatedEmployeeResponseDto,
} from '../dto/employee-response.dto';
import { ViaCepService } from './viacep.service';
import { ViaCepResponseDto } from '../dto/viacep-response.dto';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from 'date-fns';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private readonly viaCepService: ViaCepService,
  ) {}

  async create(createEmployeeDto): Promise<EmployeeResponseDto> {
    try {
      const viaCepData = await this.viaCepService.search(createEmployeeDto.cep);
      const employeeData = {
        ...createEmployeeDto,
        dateDifference: this.calculateDateDifference(
          new Date(createEmployeeDto.admissionDate),
        ),
        calculatedValue: createEmployeeDto.grossSalary * 0.35,
        address: viaCepData,
      };

      const created = await this.employeeModel.create(employeeData);
      return this.toResponseDto(created.toJSON());
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(
    query: QueryEmployeeDto,
  ): Promise<PaginatedEmployeeResponseDto> {
    const { page = 1, limit = 10, cep, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (cep) filter.cep = cep;
    if (startDate || endDate) {
      filter.admissionDate = {};
      if (startDate) filter.admissionDate.$gte = new Date(startDate);
      if (endDate) filter.admissionDate.$lte = new Date(endDate);
    }

    const [results, total] = await Promise.all([
      this.employeeModel
        .find(filter)
        .sort({ admissionDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.employeeModel.countDocuments(filter),
    ]);

    return {
      page,
      limit,
      total,
      data: results.map(this.toResponseDto),
    };
  }

  async findOne(id: string): Promise<EmployeeResponseDto> {
    const result = await this.employeeModel.findById(id).lean();
    if (!result) {
      throw new NotFoundException(`Registro com ID ${id} nao encontrado`);
    }
    return this.toResponseDto(result);
  }

  private calculateDateDifference(startDate: Date) {
    const today = new Date();
    return {
      years: differenceInYears(today, startDate),
      months: differenceInMonths(today, startDate) % 12,
      days: differenceInDays(today, startDate) % 30,
    };
  }

  private toResponseDto(document): EmployeeResponseDto {
    const { _id, __v, ...rest } = document;
    return {
      id: _id.toString(),
      ...rest,
      admissionDate: document.admissionDate.toISOString().split('T')[0],
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString(),
    };
  }
}
