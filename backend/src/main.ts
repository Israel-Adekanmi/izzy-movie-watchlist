import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { ClassTransformerModule } from 'class-transformer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://izzy-movie-watchlist-y9aw.vercel.app/',
    credentials: true,
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes extra properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for properties not defined in the DTO
      transform: true, // Enables automatic transformation of payloads to match DTO types
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Movie Watchlist API')
    .setDescription('API documentation for Movie Watchlist application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('movie-watchlist') // Optional: Add custom tags for your API
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document); // Expose Swagger at /api/docs

  // Start the server
  await app.listen(process.env.PORT || 3015);
}
bootstrap();
