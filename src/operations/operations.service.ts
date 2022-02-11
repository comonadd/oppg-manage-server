import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Operation, Status } from './entities/operation.entity';
import { OperationGateway } from './operation.gateway';

const DEFAULT_OP_DELAY_MS = 5000;

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
    @InjectQueue('operation') private operationQueue: Queue,
    @Inject(OperationGateway)
    private operationGateway: OperationGateway,
  ) {}

  // NOTE: It's possible that this will be a configurable setting in the future, so we use a getter
  getTaskDelay(): number {
    return DEFAULT_OP_DELAY_MS;
  }

  async updateOperationStatus(
    operationId: Operation['id'],
    status: Operation['status'],
  ) {
    const updated = await this.operationRepository.save({
      id: operationId,
      status,
    });
    this.operationGateway.emitOperationUpdate(updated);
  }

  async create(createOperationDto: CreateOperationDto) {
    const op = this.operationRepository.create({
      ...createOperationDto,
      status: Status.InProgress,
    });
    const opInstance = await this.operationRepository.save(op);
    this.operationQueue.add('processOperation', opInstance, {
      delay: this.getTaskDelay(),
      removeOnComplete: true,
    });
    return opInstance;
  }

  findAll() {
    return this.operationRepository.find();
  }
}
