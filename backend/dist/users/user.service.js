"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const bcrypt = require("bcryptjs");
const auth_service_1 = require("../auth/auth.service");
const email_service_1 = require("../common/email/email.service");
const reminder_repository_1 = require("./repositories/reminder.repository");
const movies_service_1 = require("./movies.service");
let UsersService = class UsersService {
    constructor(userRepository, authService, emailService, movieService, reminderRepository) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.emailService = emailService;
        this.movieService = movieService;
        this.reminderRepository = reminderRepository;
    }
    generateUserId() {
        const length = 24;
        const characters = 'abcdef0123456789';
        let userId = '';
        for (let i = 0; i < length; i++) {
            userId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return userId;
    }
    generateRandomToken() {
        const randomNum = Math.floor(Math.random() * 900000) + 100000;
        return randomNum.toString();
    }
    generateRandomPassword() {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        const length = 8;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    async create(userData) {
        try {
            const userExist = await this.userRepository.findUserByEmail(userData.email);
            if (userExist) {
                return {
                    error: true,
                    message: 'This email has been used already',
                    data: null,
                };
            }
            if (userData.confirmPassword !== userData.password) {
                return {
                    error: true,
                    message: 'The passwords do not match',
                    data: null,
                };
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userId = this.generateUserId();
            const verificationToken = this.generateRandomToken();
            const userDataWithId = {
                userId: userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                gender: userData.gender,
                password: hashedPassword,
                isEmailVerified: false,
            };
            const tokenData = {
                token: verificationToken,
                email: userData.email,
            };
            await this.userRepository.storeToken(tokenData);
            try {
                await this.emailService.sendVerificationEmail(userData.email, verificationToken);
            }
            catch (error) {
                console.error('Error sending verification email:', error);
            }
            await this.userRepository.createUser(userDataWithId);
            return {
                error: false,
                message: 'Email Verification Token Sent. Please check your inbox.',
                data: null,
            };
        }
        catch (error) {
            console.error('Error during user creation:', error);
            return {
                error: true,
                message: 'Error signing user up',
                data: null,
            };
        }
    }
    async verifyUserEmail(verifyTokenData) {
        const userData = await this.userRepository.findUserByEmail(verifyTokenData.email);
        if (!userData) {
            return {
                error: true,
                message: 'User does not exist, Invalid email',
                data: null,
            };
        }
        if (userData.isEmailVerified === true) {
            return {
                error: true,
                message: 'Email has been verified, proceed to login',
                data: null,
            };
        }
        const userToken = await this.userRepository.findTokenByEmail(verifyTokenData.email);
        if (userToken.token !== verifyTokenData.token) {
            return {
                error: true,
                message: 'Token is incorrect. Check and try again',
                data: null,
            };
        }
        const currentTime = new Date();
        const tokenCreationTime = userToken.updatedAt;
        const expirationTime = new Date(tokenCreationTime.getTime() + 6 * 60 * 60 * 1000);
        if (currentTime > expirationTime) {
            try {
                const newToken = this.generateRandomToken();
                const updateTokenData = {
                    token: newToken,
                    updatedAt: currentTime,
                };
                await this.userRepository.updateUserToken(verifyTokenData.email, updateTokenData);
                await this.emailService.sendVerificationEmail(userToken.email, newToken);
                return {
                    error: false,
                    message: 'Verification token has expired. Check inbox for a new token',
                    data: null,
                };
            }
            catch (error) {
                console.log(error);
            }
        }
        try {
            const isEmailVerified = true;
            const newUserData = await this.userRepository.findUserByEmailAndUpdate(verifyTokenData.email, isEmailVerified);
            await this.userRepository.deleteTokenByEmail(verifyTokenData.email);
            return {
                error: false,
                message: 'Email has been verified, proceed to login!',
                data: newUserData,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error creating user ${error.message}`,
                data: null,
            };
        }
    }
    async userForgotPassword(email) {
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
        }
        catch (error) {
            console.log(error);
        }
        try {
            const hashedRandomPassword = await bcrypt.hash(randomPassowrd, 10);
            const updateUserPassword = {
                password: hashedRandomPassword,
            };
            await this.userRepository.findUserEmailAndUpdate(email, updateUserPassword);
            return {
                error: false,
                message: 'A Reset Password Has Been Sent To The Email',
                data: null,
            };
        }
        catch (error) {
            console.log(error);
            return { error: 'Error sending reset password', message: error.message };
        }
    }
    async userLogIn(email, password) {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                return {
                    error: true,
                    message: 'This account does not exist',
                    data: null,
                };
            }
            const accessTokenResponse = await this.authService.validateUser(email, password);
            if (accessTokenResponse.error === true) {
                if (accessTokenResponse.message ===
                    'Email has not been verified, check your email for verification token to proceed to login') {
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
            return {
                error: false,
                message: 'Login successful',
                data: {
                    accessToken: accessTokenResponse.data.accessToken,
                    user: user,
                },
            };
        }
        catch (error) {
            console.log(error);
            return { error: true, message: error.message, data: null };
        }
    }
    async getUserProfile(userId) {
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
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: `Error getting profile ${error.message}`,
                data: null,
            };
        }
    }
    async updateUserProfile(userId, updateData) {
        try {
            const user = await this.userRepository.findUserById(userId);
            if (!user) {
                return {
                    error: true,
                    message: 'User Does not Exist',
                    data: null,
                };
            }
            const isPasswordValid = await bcrypt.compare(updateData.currentPassword, user.password);
            if (!isPasswordValid) {
                return {
                    error: true,
                    message: 'Incorrect password, try again',
                    data: null,
                };
            }
            const updatedFields = {};
            if (updateData.firstName !== '') {
                updatedFields.firstName = updateData.firstName;
            }
            if (updateData.lastName !== '') {
                updatedFields.lastName = updateData.lastName;
            }
            const hashedNewPassword = await bcrypt.hash(updateData.newPassword, 10);
            updatedFields.password = hashedNewPassword;
            const updatedUser = await this.userRepository.findUserAndUpdate(userId, updatedFields);
            return {
                error: false,
                message: 'Profile Updated successfully',
                data: updatedUser,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: `Error updating profile ${error.message}`,
                data: null,
            };
        }
    }
    async setReminder(userId, movieId, reminderTime) {
        try {
            const movie = await this.movieService.getMovieDetails(movieId);
            const user = await this.userRepository.findUserById(userId);
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
            const reminder = await this.reminderRepository.createReminder(reminderData);
            return {
                error: false,
                message: 'Reminder set successfully',
                data: reminder,
            };
        }
        catch (error) {
            console.error('Error setting reminder:', error);
            return {
                error: true,
                message: `Error setting reminder: ${error.message}`,
                data: null,
            };
        }
    }
    async getNotifications(userId) {
        const reminders = await this.reminderRepository.findUserReminders(userId);
        return {
            error: false,
            message: 'Reminder retrieved',
            data: reminders,
        };
    }
    async sendReminderNotifications() {
        const currentTime = new Date();
        const pendingReminders = await this.reminderRepository.findPendingReminders(currentTime);
        for (const reminder of pendingReminders) {
            try {
                await this.emailService.sendReminder(reminder.email, reminder.movieTitle, reminder.reminderTime.toLocaleString());
                await this.reminderRepository.markReminderAsSent(reminder.id);
                console.log(`Reminder sent for movie: ${reminder.movieTitle}`);
            }
            catch (error) {
                console.error('Error sending reminder:', error);
            }
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        auth_service_1.AuthService,
        email_service_1.EmailService,
        movies_service_1.MoviesService,
        reminder_repository_1.ReminderRepository])
], UsersService);
//# sourceMappingURL=user.service.js.map