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
    origin: [
      'http://localhost:5173', // Tu localhost
      //'https://dominio1.com',   // Primer dominio permitido
      //'https://dominio2.com',   // Segundo dominio permitido
    ], // Permitir cualquier origen
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept', // Cabeceras permitidas
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
  logger.log(`**Auth Micro Service** running on Port:${process.env.PORT}`);
}
bootstrap();
