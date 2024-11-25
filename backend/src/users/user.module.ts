import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { MoviesService } from './movies.service';
import { Watchlist, WatchlistSchema } from './schemas/watchlist.schema';
import { WatchlistRepository } from './repositories/watchlist.repository';
import { WatchlistService } from './watchlist.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Watchlist.name, schema: WatchlistSchema },
    ]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    MoviesService,
    WatchlistRepository,
    WatchlistService,
    UsersRepository,
    JwtService,
    AuthService,
  ],
  exports: [UsersService], // Export for use in other modules
})
export class UsersModule {}
