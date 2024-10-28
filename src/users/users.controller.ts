import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.getAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //* Soft Delete
  @Delete(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.softDelete(id);
  }

  //* Hard Delete
  @Delete('hard/:id')
  @Auth(ValidRoles.superUser)
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.hardDelete(id);
  }
}
