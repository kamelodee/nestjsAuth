import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from '../constants';
import { usersProviders } from './users.providers';
@Module({
  providers: [UsersService,...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}