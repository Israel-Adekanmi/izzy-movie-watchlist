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
exports.HistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const history_schema_1 = require("../schemas/history.schema");
let HistoryRepository = class HistoryRepository {
    constructor(historyModel) {
        this.historyModel = historyModel;
    }
    async createHistory(historyData) {
        return await this.historyModel.create(historyData);
    }
    async findHistoryById(historyId) {
        return await this.historyModel.findOne({ historyId });
    }
    async findUserHistorys(userId) {
        return await this.historyModel.findOne({ userId });
    }
    async updateHistory(userId, updateData) {
        return await this.historyModel.findOneAndUpdate({ userId }, updateData, {
            new: true,
        });
    }
    async addMovieToHistory(userId, movie) {
        try {
            if (!movie.id ||
                !movie.poster_path ||
                !movie.title ||
                !movie.release_date ||
                !movie.popularity) {
                throw new Error('Invalid movie data');
            }
            return await this.historyModel.findOneAndUpdate({ userId }, { $push: { movies: movie } }, { new: true, upsert: false });
        }
        catch (error) {
            console.error('Error adding movie to history:', error);
            return null;
        }
    }
    async addMovieAndDateToHistory(userId, movie, date) {
        try {
            if (!movie.id ||
                !movie.poster_path ||
                !movie.title ||
                !movie.release_date ||
                !movie.popularity) {
                throw new Error('Invalid movie data');
            }
            return await this.historyModel.findOneAndUpdate({ userId }, { $push: { movies: movie, streakDate: date } }, { new: true, upsert: false });
        }
        catch (error) {
            console.error('Error adding movie to history:', error);
            return null;
        }
    }
    async deleteHistoryById(userId) {
        const deletedToken = await this.historyModel.findOneAndDelete({
            userId,
        });
        return deletedToken;
    }
};
exports.HistoryRepository = HistoryRepository;
exports.HistoryRepository = HistoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(history_schema_1.History.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HistoryRepository);
//# sourceMappingURL=history.repository.js.map