import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly roleService: RolesService,
    private readonly userService: UsersService,
  ) {}

  async runSeed() {
    await this.deleteTables();
    // const rolesCreated = await this.insertNewRoles();
    // const usersCreated = await this.insertNewUsers();
    // console.log(rolesCreated);
    // console.log(usersCreated);
    await this.insertNewRoles();
    await this.insertNewUsers();
    return 'Seed Executed!';
  }

  private async deleteTables() {
    await this.userService.seedDeleteAllUsers();
    await this.roleService.seedDeleteAllRoles();
    return;
  }

  private async insertNewRoles() {
    const seedRoles = initialData.roles;
    const roles: Role[] = [];
    seedRoles.forEach((role) => {
      roles.push(this.roleRepository.create(role));
    });
    const dbRoles = await this.roleRepository.save(seedRoles);
    return dbRoles;
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    for await (const user of seedUsers) {
      const role = await this.roleService.getOneByName(user.role.name);
      user.role = role;
      users.push(this.userRepository.create(user));
    }
    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers;
  }
}
