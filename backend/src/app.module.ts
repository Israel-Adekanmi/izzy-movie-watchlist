import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Correctly fetch DATABASE_URL
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    UsersModule, // Import UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
