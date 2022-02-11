import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { Operation, Status } from './entities/operation.entity';
import { UtilService } from 'src/util/util.service';
import { OperationsService } from './operations.service';

@Processor('operation')
export class OperationConsumer {
  constructor(
    @Inject(UtilService)
    private utilService: UtilService,
    @Inject(OperationsService)
    private operationsService: OperationsService,
  ) {}

  @Process('processOperation')
  async processOperationJob(job: Job<Operation>) {
    const operation = job.data;
    const newStatus = this.utilService.chooseRandom([
      Status.Done,
      Status.Failed,
    ]);
    this.operationsService.updateOperationStatus(operation.id, newStatus);
  }
}
