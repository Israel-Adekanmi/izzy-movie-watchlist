"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./schemas/user.schema");
const auth_module_1 = require("../auth/auth.module");
const user_repository_1 = require("./repositories/user.repository");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const movies_service_1 = require("./movies.service");
const watchlist_schema_1 = require("./schemas/watchlist.schema");
const watchlist_repository_1 = require("./repositories/watchlist.repository");
const watchlist_service_1 = require("./watchlist.service");
const token_schema_1 = require("./schemas/token.schema");
const history_schema_1 = require("./schemas/history.schema");
const history_repository_1 = require("./repositories/history.repository");
const email_service_1 = require("../common/email/email.service");
const reminder_schema_1 = require("./schemas/reminder.schema");
const reminder_repository_1 = require("./repositories/reminder.repository");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: watchlist_schema_1.Watchlist.name, schema: watchlist_schema_1.WatchlistSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: token_schema_1.EmailVerificationToken.name,
                    schema: token_schema_1.EmailVerificationTokenSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: history_schema_1.History.name,
                    schema: history_schema_1.HistorySchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: reminder_schema_1.Reminder.name,
                    schema: reminder_schema_1.ReminderSchema,
                },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [user_controller_1.UsersController],
        providers: [
            user_service_1.UsersService,
            movies_service_1.MoviesService,
            email_service_1.EmailService,
            watchlist_repository_1.WatchlistRepository,
            history_repository_1.HistoryRepository,
            reminder_repository_1.ReminderRepository,
            watchlist_service_1.WatchlistService,
            user_repository_1.UsersRepository,
            jwt_1.JwtService,
            auth_service_1.AuthService,
        ],
        exports: [user_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=user.module.js.map