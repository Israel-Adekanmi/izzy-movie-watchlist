import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/user.module';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
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