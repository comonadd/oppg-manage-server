import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Operation } from './operations/entities/operation.entity';
import { OperationsModule } from './operations/operations.module';

const env = process.env.NODE_ENV ?? 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${env}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../db',
      entities: [Operation],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OperationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
