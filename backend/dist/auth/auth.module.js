"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../users/user.module");
const user_repository_1 = require("../users/repositories/user.repository");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
            ]),
            passport_1.PassportModule,
            (0, common_1.forwardRef)(() => user_module_1.UsersModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_AUTH_SECRET || 'CristianoRonaldo',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [auth_service_1.AuthService, user_repository_1.UsersRepository, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map