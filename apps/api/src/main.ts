import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
  app.use('/uploads', express.static(uploadDir));

  const config = new DocumentBuilder()
    .setTitle('Form Builder API')
    .setDescription('API for Dynamic Form Builder Portal')
    .setVersion('1.0')
    .addCookieAuth('auth', { type: 'apiKey', in: 'cookie' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  Logger.log(`API listening on :${port} (CORS origin: ${origin})`, 'Bootstrap');
}
bootstrap();
