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
let UsersService = class UsersService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
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
            const userDataWithId = {
                userId: userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                gender: userData.gender,
                password: hashedPassword,
                isEmailVerified: false,
            };
            await this.userRepository.createUser(userDataWithId);
            return {
                error: false,
                message: 'Sign Up Succesful',
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=user.service.js.map