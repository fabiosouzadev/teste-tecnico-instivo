import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { EmployeesService } from '../services/employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { QueryEmployeeDto } from '../dto/query-employee.dto';
import {
  EmployeeResponseDto,
  PaginatedEmployeeResponseDto,
} from '../dto/employee-response.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo registro', description: 'Cria um novo cálculo com dados de admissão, salário e CEP', })
  @ApiBody({
    type: CreateEmployeeDto,
    examples: {
      validExample: {
        value: {
          admissionDate: '2020-01-01',
          grossSalary: 5000,
          cep: '01001000',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registro criado com sucesso',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR , description: 'Erro interno no servidor' })
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar registros',
    description: 'Retorna uma lista paginada dos registros com filtros',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (default: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Resultados por página (default: 10, max: 100)',
    type: Number,
  })
  @ApiQuery({
    name: 'cep',
    required: false,
    description: 'Filtrar por CEP',
    type: String,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Data inicial (YYYY-MM-DD)',
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Data final (YYYY-MM-DD)',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de registros',
    type: PaginatedEmployeeResponseDto,
  })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erro interno no servidor' })
  async findAll(
    @Query() queryDto: QueryEmployeeDto,
  ): Promise<PaginatedEmployeeResponseDto> {
    return this.employeesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do registro',
    example: '65f8e4b75e1bf5c01f48e9a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registro encontrado',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Registro não encontrado' })
  async findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return this.employeesService.findOne(id);
  }

  // TODO: Implementar UPDATE e DELETE
}
