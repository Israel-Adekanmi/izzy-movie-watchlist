import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto, UpdateProfile } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UsersService {
    private userRepository;
    private authService;
    constructor(userRepository: UsersRepository, authService: AuthService);
    private generateUserId;
    create(userData: CreateUserDto): Promise<{
        error: boolean;
        message: string;
        data: any;
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
