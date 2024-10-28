import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserImage } from './entities/user-image.entity';
import { envs } from 'src/config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        images: [
          {
            url: envs.urlToDefaultImage,
          },
        ],
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { images, ...userToUpdate } = updateUserDto;
    const user = await this.userRepository.preload({ id, ...userToUpdate });
    if (!user) throw new NotFoundException(`User with id: '${id}' not Found`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (images) {
        await queryRunner.manager.delete(UserImage, { user: { id } });
        user.images = images.map((image) => this.userImageRepository.create({ url: image.url }));
      }
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      const userUpdated = await this.getOne(id);
      return userUpdated;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async getAll(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const totalRegs = await this.userRepository.count({
        where: { isActive: true },
      });
      const totalPages = Math.ceil(totalRegs / limit);
      const users = await this.userRepository.find({
        where: { isActive: true },
        take: limit,
        skip: (page - 1) * limit,
        order: { lastName: 'ASC', firstName: 'ASC' },
      });
      return {
        users,
        meta: {
          page,
          totalRegs,
          totalPages,
        },
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id, isActive: true } });
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async softDelete(id: string) {
    const user = await this.getOne(id);
    if (!user) throw new BadRequestException(`User with id: ${id} not found!`);
    try {
      const { affected } = await this.userRepository.update(id, { isActive: false });
      return affected;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async hardDelete(id: string) {
    const user = await this.getOne(id);
    if (!user) throw new BadRequestException(`User with id: ${id} not found!`);
    try {
      const deletedUser = await this.userRepository.remove(user);
      return deletedUser;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async seedDeleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('users');
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
