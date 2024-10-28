import { Controller, Post, Body, Get, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { User } from '../users/entities/user.entity';
import { GetUser, Auth } from './decorators';
import { Response } from 'express';
import { terminateRefreshTokenHttpOnlyCookie } from 'src/auth/utils/response-cookies.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const respuesta = await this.authService.login(loginUserDto, res);
    res.send(respuesta);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('/logout')
  @Auth()
  public logout(@Res() response: Response) {
    terminateRefreshTokenHttpOnlyCookie(response);
    response.send();
  }
}
