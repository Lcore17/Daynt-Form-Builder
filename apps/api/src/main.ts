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
  // Configure CORS to allow Vercel and local dev with credentials (cookies)
  const vercelOrigin = 'https://daynt-form-builder-web.vercel.app';
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  app.enableCors({
    // Allow explicit origins and Vercel preview subdomains
    origin: (origin, callback) => {
      const staticAllowed = new Set([
        frontendOrigin,
        vercelOrigin,
        'http://localhost:3000',
        'https://localhost:3000',
      ]);
      // Server-to-server or same-origin calls (no Origin header)
      if (!origin) return callback(null, true);
      try {
        const { hostname } = new URL(origin);
        const isVercelPreview = /\.vercel\.app$/i.test(hostname);
        if (staticAllowed.has(origin) || isVercelPreview) return callback(null, true);
      } catch (_) {
        // fall through: treat as not allowed
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
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
