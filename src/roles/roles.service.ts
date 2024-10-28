import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create({ ...createRoleDto });
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getAll(paginationDto: PaginationDto, roleLevel: { level: number }) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const { level } = roleLevel;

      const roles = await this.roleRepository
        .createQueryBuilder('role')
        .where('role.isActive = :isActive', { isActive: true })
        .andWhere('role.level >= :level', { level })
        .orderBy('role.name', 'ASC')
        .skip(offset)
        .take(limit)
        .getMany();
      if (!roles) throw new NotFoundException('Roles not Found');
      return roles;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getOne(id: string) {
    try {
      const role = await this.roleRepository.findOne({ where: { id, isActive: true } });
      return role;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getOneByName(name: string) {
    try {
      const role = await this.roleRepository.findOne({ where: { name, isActive: true } });
      return role;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getOne(id);
    if (!role) throw new BadRequestException(`Role with id: ${id} not found!`);
    try {
      const { affected } = await this.roleRepository.update(id, updateRoleDto);
      return { updated: true, rowsAffected: affected };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async softDelete(id: string) {
    const role = await this.getOne(id);
    if (!role) throw new BadRequestException(`Role with id: ${id} not found!`);
    try {
      const disabledRole = await this.roleRepository.update(id, { isActive: false });
      return disabledRole;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async hardDelete(id: string) {
    const role = await this.getOne(id);
    if (!role) throw new BadRequestException(`Role with id: ${id} not found!`);
    try {
      const deletedRole = await this.roleRepository.remove(role);
      return deletedRole;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async seedDeleteAllRoles() {
    //* URL SEED - https://gist.github.com/Klerith/1fb1b9f758bb0c5b2253dfc94f09e1b6
    const query = this.roleRepository.createQueryBuilder('users');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error!, check server logs.');
  }
}
