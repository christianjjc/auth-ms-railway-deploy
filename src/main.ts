/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Christian Jiménez Calvo | CJDev
 * @contact cjjc@cjjc.pe | www.cjjc.pe
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap-Main');

  app.use(cookieParser(envs.cookieSecret));

  //* Configurar CORS para recibir las cookies
  app.enableCors({
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);
  logger.log(`**Auth Micro Service** running on Port:${envs.port}`);
}
bootstrap();
