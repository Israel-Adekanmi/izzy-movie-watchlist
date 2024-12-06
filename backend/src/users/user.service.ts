import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, tokenDto, UpdateProfile } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { EmailService } from 'src/common/email/email.service';
import { ReminderRepository } from './repositories/reminder.repository';
import { MoviesService } from './movies.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private authService: AuthService,
    private emailService: EmailService,
    private movieService: MoviesService,
    private reminderRepository: ReminderRepository,
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

  private generateRandomToken(): string {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return randomNum.toString();
  }

  private generateRandomPassword(): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    const length = 8;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
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
      const verificationToken = this.generateRandomToken();

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
      const tokenData = {
        token: verificationToken,
        email: userData.email,
      };
      await this.userRepository.storeToken(tokenData);

      // Send verification email
      try {
        await this.emailService.sendVerificationEmail(
          userData.email,
          verificationToken,
        );
      } catch (error) {
        console.error('Error sending verification email:', error);
      }

      // Store user profile details in the database
      await this.userRepository.createUser(userDataWithId);

      return {
        error: false,
        message: 'Email Verification Token Sent. Please check your inbox.',
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

  async verifyUserEmail(verifyTokenData: tokenDto) {
    const userData = await this.userRepository.findUserByEmail(
      verifyTokenData.email,
    );

    //Checks if user profile exists
    if (!userData) {
      return {
        error: true,
        message: 'User does not exist, Invalid email',
        data: null,
      };
    }

    //Checks if user email is verified
    if (userData.isEmailVerified === true) {
      return {
        error: true,
        message: 'Email has been verified, proceed to login',
        data: null,
      };
    }

    const userToken = await this.userRepository.findTokenByEmail(
      verifyTokenData.email,
    );

    //Checks If user token matches
    if (userToken.token !== verifyTokenData.token) {
      return {
        error: true,
        message: 'Token is incorrect. Check and try again',
        data: null,
      };
    }

    //Gets the current time now
    const currentTime = new Date();
    const tokenCreationTime = userToken.updatedAt;

    //Calculates the date of expiration by adding 6 hrs to the time at which the token was created
    const expirationTime = new Date(
      tokenCreationTime.getTime() + 6 * 60 * 60 * 1000,
    ); // Add 6 hours in milliseconds

    //Checks if token is expired
    if (currentTime > expirationTime) {
      try {
        //Generate a new token if the token has expired
        const newToken = this.generateRandomToken();

        //Update and store in the db with the new token
        const updateTokenData = {
          token: newToken,
          updatedAt: currentTime,
        };

        await this.userRepository.updateUserToken(
          verifyTokenData.email,
          updateTokenData,
        );

        //Send an email to the user with the new token
        await this.emailService.sendVerificationEmail(
          userToken.email,
          newToken,
        );

        return {
          error: false,
          message:
            'Verification token has expired. Check inbox for a new token',
          data: null,
        };
      } catch (error) {
        console.log(error);
      }
    }

    try {
      //Update the user profile to true after successfull verification
      const isEmailVerified = true;

      const newUserData = await this.userRepository.findUserByEmailAndUpdate(
        verifyTokenData.email,
        isEmailVerified,
      );

      //Delete the token data from the db
      await this.userRepository.deleteTokenByEmail(verifyTokenData.email);

      return {
        error: false,
        message: 'Email has been verified, proceed to login!',
        data: newUserData,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error creating user ${error.message}`,
        data: null,
      };
    }
  }

  async userForgotPassword(email: string) {
    //Generate a new reset password for user
    const randomPassowrd = this.generateRandomPassword();

    try {
      const findUser = await this.userRepository.findUserByEmail(email);

      if (!findUser) {
        return {
          error: true,
          message: 'This email does not exist, try signing up',
          data: null,
        };
      }
      await this.emailService.sendResetPassword(email, randomPassowrd);
      // return sendEmailForReset;
    } catch (error) {
      console.log(error);
    }
    try {
      //Hash the newly generated password
      const hashedRandomPassword = await bcrypt.hash(randomPassowrd, 10);
      const updateUserPassword = {
        password: hashedRandomPassword,
      };

      //Update the user data with the new password
      await this.userRepository.findUserEmailAndUpdate(
        email,
        updateUserPassword,
      );

      return {
        error: false,
        message: 'A Reset Password Has Been Sent To The Email',
        data: null,
      };
    } catch (error) {
      console.log(error);
      return { error: 'Error sending reset password', message: error.message };
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

  async setReminder(
    userId: string,
    movieId: number,
    reminderTime: string,
  ): Promise<any> {
    try {
      const movie = await this.movieService.getMovieDetails(movieId);

      const user = await this.userRepository.findUserById(userId);
      // Convert reminderTime to a Date object
      const reminderDate = new Date(reminderTime);

      if (isNaN(reminderDate.getTime())) {
        return {
          error: true,
          message: 'Invalid reminder time format',
          data: null,
        };
      }

      const reminderData = {
        userId: userId,
        movieId: movieId,
        movieTitle: movie.title,
        email: user.email,
        reminderTime: reminderDate,
        isSent: false,
      };

      // Save the reminder
      const reminder =
        await this.reminderRepository.createReminder(reminderData);

      return {
        error: false,
        message: 'Reminder set successfully',
        data: reminder,
      };
    } catch (error) {
      console.error('Error setting reminder:', error);
      return {
        error: true,
        message: `Error setting reminder: ${error.message}`,
        data: null,
      };
    }
  }

  async getNotifications(userId: string): Promise<any> {
    const reminders = await this.reminderRepository.findUserReminders(userId);

    return {
      error: false,
      message: 'Reminder retrieved',
      data: reminders,
    };
  }

  async sendReminderNotifications() {
    const currentTime = new Date();
    const pendingReminders =
      await this.reminderRepository.findPendingReminders(currentTime);

    if (!pendingReminders.length) {
      // console.log('[Service] No pending reminders to process.');
      return;
    }

    for (const reminder of pendingReminders) {
      try {
        // Send email
        await this.emailService.sendReminder(
          reminder.email,
          reminder.movieTitle,
          reminder.reminderTime.toLocaleString(),
        );

        // Mark reminder as sent
        await this.reminderRepository.markReminderAsSent(reminder.id);
        console.log(`Reminder sent for movie: ${reminder.movieTitle}`);
      } catch (error) {
        console.error('Error sending reminder:', error);
      }
    }
  }

  async cancelReminder(id: string) {
    try {
      await this.reminderRepository.deleteReminderById(id);

      return {
        error: false,
        message: 'Reminder canceled succesfully',
        data: null,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error setting reminder: ${error.message}`,
        data: null,
      };
    }
  }

  async markReminderAsSent(reminderId: string) {
    try {
      const reminder =
        await this.reminderRepository.findReminderById(reminderId);

      if (!reminder) {
        return {
          error: false,
          message: 'Reminder Does Not Exist',
          data: null,
        };
      }

      if (reminder.isSent === true) {
        return {
          error: false,
          message: 'Reminder has already marked as sent succesfully',
          data: null,
        };
      }
      await this.reminderRepository.deleteReminderById(reminderId);

      return {
        error: false,
        message: 'Reminder marked as sent succesfully',
        data: null,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error setting reminder: ${error.message}`,
        data: null,
      };
    }
  }
}
