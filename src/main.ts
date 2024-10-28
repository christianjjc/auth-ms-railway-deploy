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
// import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap-Main');

  app.use(cookieParser(envs.cookieSecret));

  // app.use(function (request: Request, response: Response, next: NextFunction) {
  //   response.setHeader('Access-Control-Allow-Origin', envs.clientUrlOnDeploy);
  //   next();
  // });

  //* Configurar CORS para recibir las cookies
  app.enableCors({
    origin: [
      'http://localhost:5173', // Tu localhost
      envs.clientUrlOnDeploy, // Primer dominio permitido
    ], // Permitir cualquier origen
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
    // allowedHeaders: 'Content-Type, Accept', // Cabeceras permitidas
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Authorization'], // Añade 'Authorization' si usas tokens
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
