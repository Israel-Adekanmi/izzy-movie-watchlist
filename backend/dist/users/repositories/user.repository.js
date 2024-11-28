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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const token_schema_1 = require("../schemas/token.schema");
let UsersRepository = class UsersRepository {
    constructor(userModel, verificationTokenModel) {
        this.userModel = userModel;
        this.verificationTokenModel = verificationTokenModel;
    }
    async createUser(userDetails) {
        return this.userModel.create(userDetails);
    }
    async findUserById(userId) {
        return this.userModel.findOne({ userId });
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async findUserAndUpdate(userId, updateFields) {
        const user = await this.userModel.findOneAndUpdate({ userId }, { $set: updateFields }, { new: true });
        return user;
    }
    async findTokenByEmail(email) {
        return this.verificationTokenModel.findOne({ email });
    }
    async storeToken(tokenData) {
        return this.verificationTokenModel.create(tokenData);
    }
    async updateUserToken(email, token) {
        const userToken = await this.verificationTokenModel.findOneAndUpdate({ email }, token, { new: true });
        return userToken;
    }
    async findUserByEmailAndUpdate(email, isEmailVerified) {
        const user = await this.userModel.findOneAndUpdate({ email }, { isEmailVerified }, { new: true });
        return user;
    }
    async findUserEmailAndUpdate(email, updateFields) {
        const user = await this.userModel.findOneAndUpdate({ email }, { $set: updateFields }, { new: true });
        return user;
    }
    async deleteTokenByEmail(email) {
        const deletedToken = await this.verificationTokenModel.findOneAndDelete({
            email,
        });
        return deletedToken;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_schema_1.EmailVerificationToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersRepository);
//# sourceMappingURL=user.repository.js.map