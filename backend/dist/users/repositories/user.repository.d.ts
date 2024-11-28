import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { EmailVerificationToken, EmailVerificationTokenDocument } from '../schemas/token.schema';
import { UpdateTokenDto } from '../dto/create-user.dto';
export declare class UsersRepository {
    private userModel;
    private verificationTokenModel;
    constructor(userModel: Model<UserDocument>, verificationTokenModel: Model<EmailVerificationTokenDocument>);
    createUser(userDetails: User): Promise<UserDocument>;
    findUserById(userId: string): Promise<UserDocument>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserAndUpdate(userId: string, updateFields: Partial<UserDocument>): Promise<UserDocument | null>;
    findTokenByEmail(email: string): Promise<EmailVerificationTokenDocument>;
    storeToken(tokenData: EmailVerificationToken): Promise<EmailVerificationTokenDocument>;
    updateUserToken(email: string, token: UpdateTokenDto): Promise<EmailVerificationTokenDocument>;
    findUserByEmailAndUpdate(email: string, isEmailVerified: boolean): Promise<UserDocument>;
    findUserEmailAndUpdate(email: string, updateFields: Partial<UserDocument>): Promise<UserDocument | null>;
    deleteTokenByEmail(email: string): Promise<EmailVerificationTokenDocument>;
}
