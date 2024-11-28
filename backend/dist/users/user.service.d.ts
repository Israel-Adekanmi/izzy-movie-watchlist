import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto, tokenDto, UpdateProfile } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { EmailService } from 'src/common/email/email.service';
export declare class UsersService {
    private userRepository;
    private authService;
    private emailService;
    constructor(userRepository: UsersRepository, authService: AuthService, emailService: EmailService);
    private generateUserId;
    private generateRandomToken;
    private generateRandomPassword;
    create(userData: CreateUserDto): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    verifyUserEmail(verifyTokenData: tokenDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
    userForgotPassword(email: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    } | {
        error: string;
        message: any;
        data?: undefined;
    }>;
    userLogIn(email: string, password: string): Promise<any>;
    getUserProfile(userId: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
    updateUserProfile(userId: string, updateData: UpdateProfile): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
}
