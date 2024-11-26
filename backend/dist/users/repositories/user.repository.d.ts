import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class UsersRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(userDetails: User): Promise<UserDocument>;
    findUserById(userId: string): Promise<UserDocument>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserAndUpdate(userId: string, updateFields: Partial<UserDocument>): Promise<UserDocument | null>;
}
