import { Gender } from '../types/user.type';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    password: string;
    confirmPassword: string;
}
export declare class SetReminderDto {
    movieId: number;
    reminderTime: string;
}
export declare class UpdateProfile {
    firstName: string;
    lastName: string;
    currentPassword: string;
    newPassword: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class tokenDto {
    email: string;
    token: string;
}
export declare class ForgotPassDto {
    email: string;
}
export declare class UpdateTokenDto {
    token: string;
    updatedAt: Date;
}
