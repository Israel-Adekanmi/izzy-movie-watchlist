import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.enableCors({
    origin: [
      'https://izzy-movie-watchlist-2iw1.vercel.app', // Deployed frontend
      'https://izzy-watch-movie-16.onrender.com',
      'http://localhost:4173', // Local development frontend
    ],
    credentials: true, // Allow cookies or authentication headers
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Movie Watchlist API')
    .setDescription('API documentation for Movie Watchlist application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  // const port = process.env.DEPLOYMENT_PORT || 3016; // Default to 3000 if PORT is not set
  const port = 3015;
  await app.listen(port);

  // Initialize the app without listening (for serverless compatibility)
  await app.init();
}

bootstrap();

// Export the handler function for Vercel
export const handler = (req: any, res: any) => {
  expressApp(req, res);
};
