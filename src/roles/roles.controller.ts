import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Post('get-all')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  findAll(@Query() paginationDto: PaginationDto, @Body() roleLevel: { level: number }) {
    return this.rolesService.getAll(paginationDto, roleLevel);
  }

  @Get(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.getOne(id);
  }

  @Get('name/:term')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  findOneByName(@Param('term') term: string) {
    return this.rolesService.getOneByName(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  //* Soft Delete
  @Delete(':id')
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.softDelete(id);
  }

  //* Hard Delete
  @Delete('hard/:id')
  @Auth(ValidRoles.superUser)
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.hardDelete(id);
  }
}
