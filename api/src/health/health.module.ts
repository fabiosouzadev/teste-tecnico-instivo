import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo:27017/test'),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
