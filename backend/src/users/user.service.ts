import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateProfile } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  private generateUserId(): string {
    const length = 24; // 24 characters hexadecimal
    const characters = 'abcdef0123456789';
    let userId = '';

    // Generate random hexadecimal characters
    for (let i = 0; i < length; i++) {
      userId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return userId;
  }

  async create(userData: CreateUserDto) {
    try {
      // Check if a profile exists with the user email
      const userExist = await this.userRepository.findUserByEmail(
        userData.email,
      );

      if (userExist) {
        return {
          error: true,
          message: 'This email has been used already',
          data: null,
        };
      }

      // Check if the passwords match before hashing
      if (userData.confirmPassword !== userData.password) {
        return {
          error: true,
          message: 'The passwords do not match',
          data: null,
        };
      }
      //   console.log(userData);
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      //   console.log(hashedPassword);

      // Generate userId and verification token
      const userId = this.generateUserId();
      //   const verificationToken = this.generateRandomToken();

      // Prepare user data
      const userDataWithId = {
        userId: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        gender: userData.gender,
        password: hashedPassword, // Ensure address is handled if provided
        isEmailVerified: false,
      };

      // Store the token in the database
      //   const tokenData = {
      //     token: verificationToken,
      //     email: userData.email,
      //     signUpType: SignUpType.user,
      //   };
      //   await this.userRepository.storeToken(tokenData);

      //   // Send verification email
      //   try {
      //     await this.emailService.sendVerificationEmail(
      //       userData.email,
      //       verificationToken,
      //     );
      //   } catch (error) {
      //     console.error('Error sending verification email:', error);
      //   }

      // Store user profile details in the database
      await this.userRepository.createUser(userDataWithId);

      return {
        error: false,
        message: 'Sign Up Succesful',
        data: null,
      };
    } catch (error) {
      console.error('Error during user creation:', error);
      return {
        error: true,
        message: 'Error signing user up',
        data: null,
      };
    }
  }

  async userLogIn(email: string, password: string) {
    try {
      //   const user = await this.userRepository.findUserByEmail(email);

      const user = await this.userRepository.findUserByEmail(email);

      //   console.log(user);
      if (!user) {
        return {
          error: true,
          message: 'This account does not exist',
          data: null,
        };
      }

      //Sends the email and string to the authService for Authentication
      const accessTokenResponse = await this.authService.validateUser(
        email,
        password,
      );

      if (accessTokenResponse.error === true) {
        if (
          accessTokenResponse.message ===
          'Email has not been verified, check your email for verification token to proceed to login'
        ) {
          const newTokenResponse = {
            error: accessTokenResponse.error,
            message: accessTokenResponse.message,
            data: null,
            user: user,
          };
          return newTokenResponse;
        }

        return accessTokenResponse;
      }

      //Return accessToken
      return {
        error: false,
        message: 'Login successful',
        data: {
          accessToken: accessTokenResponse.data.accessToken,
          user: user,
        },
      };
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message, data: null };
    }
  }

  async getUserProfile(userId: string) {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        return {
          error: true,
          message: 'User Does not Exist',
          data: null,
        };
      }

      return {
        error: false,
        message: 'User Profile',
        data: user,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: `Error getting profile ${error.message}`,
        data: null,
      };
    }
  }

  async updateUserProfile(userId: string, updateData: UpdateProfile) {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        return {
          error: true,
          message: 'User Does not Exist',
          data: null,
        };
      }

      const isPasswordValid = await bcrypt.compare(
        updateData.currentPassword,
        user.password,
      );

      //Return error message if it is incorrect
      if (!isPasswordValid) {
        return {
          error: true,
          message: 'Incorrect password, try again',
          data: null,
        };
      }

      // Prepare update payload
      const updatedFields: any = {};
      if (updateData.firstName !== '') {
        updatedFields.firstName = updateData.firstName;
      }
      if (updateData.lastName !== '') {
        updatedFields.lastName = updateData.lastName;
      }

      // Hash and update the new password
      const hashedNewPassword = await bcrypt.hash(updateData.newPassword, 10);
      updatedFields.password = hashedNewPassword;

      const updatedUser = await this.userRepository.findUserAndUpdate(
        userId,
        updatedFields,
      );
      return {
        error: false,
        message: 'Profile Updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: `Error updating profile ${error.message}`,
        data: null,
      };
    }
  }
}
