import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Operation } from './entities/operation.entity';

@WebSocketGateway({
  cors: true,
})
export class OperationGateway {
  @WebSocketServer()
  server: Server;

  emitOperationUpdate(operation: Operation) {
    this.server.emit('updateOperation', operation);
  }
}
