import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
}
