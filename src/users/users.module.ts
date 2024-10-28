import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserImage } from './entities/user-image.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AuthModule, TypeOrmModule.forFeature([User, UserImage])],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
