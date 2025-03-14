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
  @ApiOperation({ summary: 'Criar um novo registro' })
  @ApiResponse({
    status: 201,
    description: 'Registro criado com sucesso',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de registros',
    type: PaginatedEmployeeResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
  findAll(
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
    status: 200,
    description: 'Registro encontrado',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
  findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return this.employeesService.findOne(id);
  }

  // TODO: Implementar UPDATE e DELETE
}
