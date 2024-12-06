import { UsersRepository } from './repositories/user.repository';
import { CreateUserDto, tokenDto, UpdateProfile } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { EmailService } from 'src/common/email/email.service';
import { ReminderRepository } from './repositories/reminder.repository';
import { MoviesService } from './movies.service';
export declare class UsersService {
    private userRepository;
    private authService;
    private emailService;
    private movieService;
    private reminderRepository;
    constructor(userRepository: UsersRepository, authService: AuthService, emailService: EmailService, movieService: MoviesService, reminderRepository: ReminderRepository);
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
    setReminder(userId: string, movieId: number, reminderTime: string): Promise<any>;
    getNotifications(userId: string): Promise<any>;
    sendReminderNotifications(): Promise<void>;
    cancelReminder(id: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    markReminderAsSent(reminderId: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
}
