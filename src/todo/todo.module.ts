import { Module } from '@nestjs/common';

import { TodoService } from './todo.service';
import { USER_REPOSITORY } from '../constants';
import { todoProviders } from './todo.providers';
import { TodoController } from './todo.controller';
@Module({
    providers: [TodoService,...todoProviders],
    exports: [TodoService],
    controllers: [TodoController],
  })
export class TodoModule {}
