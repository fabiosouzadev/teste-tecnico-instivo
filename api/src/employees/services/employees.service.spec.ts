import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmployeesService } from './employees.service';
import { ViaCepService } from './viacep.service';
import { Employee } from '../schemas/employee.schema';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let viaCepService: ViaCepService;
  let employeeModel: any;

  const mockEmployeeModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn(),
    countDocuments: jest.fn(),
    findById: jest.fn(),
  };

  const mockViaCepService = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeModel,
        },
        {
          provide: ViaCepService,
          useValue: mockViaCepService,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    viaCepService = module.get<ViaCepService>(ViaCepService);
    employeeModel = module.get(getModelToken(Employee.name));
  });

  describe('create', () => {
    it('should create a calculation with valid data', async () => {
      const createDto = {
        admissionDate: '2020-01-01',
        grossSalary: 5000,
        cep: '01001000',
      };

      mockViaCepService.search.mockResolvedValue({
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      });

      mockEmployeeModel.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...createDto,
      });

      const result = await service.create(createDto);
      
      expect(viaCepService.search).toHaveBeenCalledWith('01001000');
      expect(employeeModel.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });

    it('should throw error for invalid CEP', async () => {
      mockViaCepService.search.mockRejectedValue(new Error('CEP inválido'));
      await expect(service.create({
        admissionDate: '2020-01-01',
        grossSalary: 5000,
        cep: '00000000',
      })).rejects.toThrow('CEP inválido');
    });
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const mockData = [{
        _id: '507f1f77bcf86cd799439011',
        admissionDate: new Date(),
        grossSalary: 5000,
        cep: '01001000',
      }];

      employeeModel.lean.mockResolvedValue(mockData);
      employeeModel.countDocuments.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });
      
      expect(result).toHaveProperty('data');
      expect(result.data.length).toBe(1);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a calculation by id', async () => {
      const mockEmployee = {
        _id: '507f1f77bcf86cd799439011',
        admissionDate: new Date(),
        grossSalary: 5000,
        cep: '01001000',
      };

      employeeModel.findById.mockReturnValue({
        lean: () => mockEmployee,
      });

      const result = await service.findOne('507f1f77bcf86cd799439011');
      expect(result).toMatchObject(mockEmployee);
    });

    it('should throw not found error', async () => {
      employeeModel.findById.mockReturnValue({
        lean: () => null,
      });

      await expect(service.findOne('invalid_id')).rejects.toThrow(
        'Cálculo não encontrado',
      );
    });
  });
});
