import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import {
  EmailVerificationToken,
  EmailVerificationTokenDocument,
} from '../schemas/token.schema';
import { UpdateTokenDto } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(EmailVerificationToken.name)
    private verificationTokenModel: Model<EmailVerificationTokenDocument>,
  ) {}

  // Method to create a new user
  async createUser(userDetails: User): Promise<UserDocument> {
    return this.userModel.create(userDetails);
  }

  // Method to find a user by their userId
  async findUserById(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({ userId });
  }

  // Method to find a user by their email
  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email });
  }

  async findUserAndUpdate(
    userId: string,
    updateFields: Partial<UserDocument>,
  ): Promise<UserDocument | null> {
    // Find the user by email and update their fields
    const user = await this.userModel.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true },
    );
    return user;
  }

  // Method to find a verification token by email
  async findTokenByEmail(
    email: string,
  ): Promise<EmailVerificationTokenDocument> {
    return this.verificationTokenModel.findOne({ email });
  }

  // Method to store a new verification token
  async storeToken(
    tokenData: EmailVerificationToken,
  ): Promise<EmailVerificationTokenDocument> {
    return this.verificationTokenModel.create(tokenData);
  }

  // Method to update a user's verification token
  async updateUserToken(
    email: string,
    token: UpdateTokenDto,
  ): Promise<EmailVerificationTokenDocument> {
    // Find the user by email and update their token
    const userToken = await this.verificationTokenModel.findOneAndUpdate(
      { email },
      token,
      { new: true },
    );
    return userToken;
  }

  // Method to find a user by email and update their email verification status
  async findUserByEmailAndUpdate(
    email: string,
    isEmailVerified: boolean,
  ): Promise<UserDocument> {
    // Find the user by email and update their email verification status
    const user = await this.userModel.findOneAndUpdate(
      { email },
      { isEmailVerified },
      { new: true },
    );
    return user;
  }

  async findUserEmailAndUpdate(
    email: string,
    updateFields: Partial<UserDocument>,
  ): Promise<UserDocument | null> {
    // Find the user by email and update their fields
    const user = await this.userModel.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true },
    );
    return user;
  }

  // Method to delete a verification token by email
  async deleteTokenByEmail(
    email: string,
  ): Promise<EmailVerificationTokenDocument> {
    // Find and delete the verification token by email
    const deletedToken = await this.verificationTokenModel.findOneAndDelete({
      email,
    });
    return deletedToken;
  }
}
