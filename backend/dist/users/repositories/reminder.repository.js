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
exports.ReminderRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reminder_schema_1 = require("../schemas/reminder.schema");
let ReminderRepository = class ReminderRepository {
    constructor(reminderModel) {
        this.reminderModel = reminderModel;
    }
    async createReminder(reminderData) {
        return await this.reminderModel.create(reminderData);
    }
    async findReminderById(reminderId) {
        return await this.reminderModel.findOne({ reminderId });
    }
    async findPendingReminders(currentTime) {
        return this.reminderModel.find({
            reminderTime: { $lte: currentTime },
            isSent: false,
        });
    }
    async markReminderAsSent(reminderId) {
        await this.reminderModel.updateOne({ _id: reminderId }, { isSent: true });
    }
    async findUserReminders(userId) {
        return await this.reminderModel.find({
            userId,
        });
    }
    async updateReminder(userId, updateData) {
        return await this.reminderModel.findOneAndUpdate({ userId }, updateData, {
            new: true,
        });
    }
    async addMovieToReminder(userId, movie) {
        try {
            if (!movie.id ||
                !movie.poster_path ||
                !movie.title ||
                !movie.release_date ||
                !movie.popularity) {
                throw new Error('Invalid movie data');
            }
            return await this.reminderModel.findOneAndUpdate({ userId }, { $push: { movies: movie } }, { new: true, upsert: false });
        }
        catch (error) {
            console.error('Error adding movie to reminder:', error);
            return null;
        }
    }
    async addMovieAndDateToReminder(userId, movie, date) {
        try {
            if (!movie.id ||
                !movie.poster_path ||
                !movie.title ||
                !movie.release_date ||
                !movie.popularity) {
                throw new Error('Invalid movie data');
            }
            return await this.reminderModel.findOneAndUpdate({ userId }, { $push: { movies: movie, streakDate: date } }, { new: true, upsert: false });
        }
        catch (error) {
            console.error('Error adding movie to reminder:', error);
            return null;
        }
    }
    async deleteReminderById(userId) {
        const deletedToken = await this.reminderModel.findOneAndDelete({
            userId,
        });
        return deletedToken;
    }
};
exports.ReminderRepository = ReminderRepository;
exports.ReminderRepository = ReminderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reminder_schema_1.Reminder.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReminderRepository);
//# sourceMappingURL=reminder.repository.js.map