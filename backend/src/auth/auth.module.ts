import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/user.module';
import { UsersRepository } from '../users/repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import {
  EmailVerificationToken,
  EmailVerificationTokenSchema,
} from 'src/users/schemas/token.schema';
import { History, HistorySchema } from 'src/users/schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: EmailVerificationToken.name,
        schema: EmailVerificationTokenSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema,
      },
    ]),
    // Use forwardRef to handle circular dependencies
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_AUTH_SECRET || 'CristianoRonaldo',
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [AuthService, UsersRepository, JwtStrategy],
})
export class AuthModule {}
