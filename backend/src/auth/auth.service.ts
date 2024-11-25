import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // Method to validate user credentials
  async validateUser(email: string, password: string): Promise<any> {
    // Find the user by email
    const user = await this.usersRepository.findUserByEmail(email);

    // console.log(user);

    if (user) {
      // Check if the password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);

      //Return error message if it is incorrect
      if (!isPasswordValid) {
        const invalidPasswordResponse = {
          error: true,
          message: 'Incorrect password, try again',
          data: null,
        };
        return invalidPasswordResponse;
      }

      //Check if the user email has been verified, that is completed sign up
      //   if (user.isEmailVerified === false) {
      //     const emailNotVerifiedRes = {
      //       error: true,
      //       message:
      //         'Email has not been verified, check your email for verification token to proceed to login',
      //       data: null,
      //     };
      //     return emailNotVerifiedRes;
      //   }

      const payload = { userId: user.userId, email: user.email };

      // console.log(payload);

      try {
        // Sign the payload asynchronously
        // const accessToken = this.jwtService.sign(user.userId.toString(), {
        //   secret: process.env.JWT_AUTH_SECRET,
        //   privateKey: user.email,
        // });

        const accessToken = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_AUTH_SECRET,
          expiresIn: '1h',
        });

        // console.log('Generated access token:', accessToken);
        // console.log(accessTokenTwo);

        // Return the access token
        const accessTokenResponse = {
          error: false,
          message: 'Login Successfully!',
          data: {
            accessToken: accessToken,
          },
        };
        return accessTokenResponse;
      } catch (error) {
        return {
          error: true,
          message: error?.message ? error.message : 'Error signing JWT token',
          data: null,
        };
      }
    }
  }

  // Method to log in user
  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
