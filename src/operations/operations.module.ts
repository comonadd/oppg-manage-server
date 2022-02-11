import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { Operation } from './entities/operation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { OperationGateway } from './operation.gateway';
import { OperationConsumer } from './operation.consumer';
import { UtilService } from 'src/util/util.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    BullModule.registerQueue({
      name: 'operation',
    }),
  ],
  controllers: [OperationsController],
  providers: [
    OperationsService,
    OperationGateway,
    OperationConsumer,
    UtilService,
  ],
})
export class OperationsModule {}
