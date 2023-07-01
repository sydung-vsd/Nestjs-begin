import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaksRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])], // phải import Repository vào module để có thể sử dụng
  controllers: [TasksController],
  providers: [TasksService, TaksRepository] // import cả Repository vào để sử dụng
})
export class TasksModule {}
