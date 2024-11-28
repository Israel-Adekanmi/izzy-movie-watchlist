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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("../users/repositories/user.repository");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersRepository.findUserByEmail(email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                const invalidPasswordResponse = {
                    error: true,
                    message: 'Incorrect password, try again',
                    data: null,
                };
                return invalidPasswordResponse;
            }
            if (user.isEmailVerified === false) {
                const emailNotVerifiedRes = {
                    error: true,
                    message: 'Email has not been verified, check your email for verification token to proceed to login',
                    data: null,
                };
                return emailNotVerifiedRes;
            }
            const payload = { userId: user.userId, email: user.email };
            try {
                const accessToken = await this.jwtService.signAsync(payload, {
                    secret: process.env.JWT_AUTH_SECRET,
                    expiresIn: '1h',
                });
                const accessTokenResponse = {
                    error: false,
                    message: 'Login Successfully!',
                    data: {
                        accessToken: accessToken,
                    },
                };
                return accessTokenResponse;
            }
            catch (error) {
                return {
                    error: true,
                    message: error?.message ? error.message : 'Error signing JWT token',
                    data: null,
                };
            }
        }
    }
    async login(user) {
        const payload = { email: user.email, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map