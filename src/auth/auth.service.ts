import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces';
import { Response } from 'express';
import { setRefreshTokenToHttpOnlyCookie } from 'src/auth/utils/response-cookies.util';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });
    if (!user) throw new UnauthorizedException('email/password not valid!');
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException(['email/password not valid!']);
    const token = this.getJwt({ id: user.id });
    setRefreshTokenToHttpOnlyCookie(res, token);
    return { ...user, token };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwt({ id: user.id }),
    };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error!, check server logs.');
  }
}
