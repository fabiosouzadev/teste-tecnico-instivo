import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect } from 'mongoose';

describe('EmployeesController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    mongoConnection = (await connect(uri)).connection;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongoServer.stop();
    await app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  describe('/employess (POST)', () => {
    it('should create a calculation', async () => {
      const response = await request(app.getHttpServer())
        .post('/employees')
        .send({
          admissionDate: '2020-01-01',
          grossSalary: 5000,
          cep: '01001000',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.address.localidade).toBe('São Paulo');
    });

    it('should return 400 for invalid CEP', async () => {
      await request(app.getHttpServer())
        .post('/employees')
        .send({
          admissionDate: '2020-01-01',
          grossSalary: 5000,
          cep: '00000000',
        })
        .expect(400);
    });
  });

  describe('/employess (GET)', () => {
    it('should return paginated calculations', async () => {
      // Create test data
      await request(app.getHttpServer())
        .post('/employees')
        .send({
          admissionDate: '2020-01-01',
          grossSalary: 5000,
          cep: '01001000',
        });

      const response = await request(app.getHttpServer())
        .get('/employees?page=1&limit=10')
        .expect(200);

      expect(response.body.data.length).toBe(1);
      expect(response.body.total).toBe(1);
    });
  });

  describe('/employees/:id (GET)', () => {
    it('should return a calculation by id', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/employees')
        .send({
          admissionDate: '2020-01-01',
          grossSalary: 5000,
          cep: '01001000',
        });

      const response = await request(app.getHttpServer())
        .get(`/employees/${createResponse.body.id}`)
        .expect(200);

      expect(response.body.id).toBe(createResponse.body.id);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer())
        .get('/calculations/507f1f77bcf86cd799439011')
        .expect(404);
    });
  });
});
