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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
const history_repository_1 = require("./repositories/history.repository");
let MoviesService = class MoviesService {
    constructor(configService, historyRepository) {
        this.configService = configService;
        this.historyRepository = historyRepository;
        this.tmdbApiKey = this.configService.get('TMDB_API_KEY');
        this.tmdbBaseUrl = 'https://api.themoviedb.org/3';
    }
    formatDate(date) {
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${day}-${month}`;
    }
    async searchMovies(query, page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/search/movie`, {
                params: {
                    api_key: this.tmdbApiKey,
                    query,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error searching movies:', error.message);
            throw new common_1.HttpException({ message: 'Failed to search movies', error: error.response?.data }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMovieDetails(movieId) {
        const url = `${this.tmdbBaseUrl}/movie/${movieId}`;
        const response = await axios_1.default.get(url, {
            params: {
                api_key: this.tmdbApiKey,
                language: 'en-US',
            },
        });
        return response.data;
    }
    async deleteHistory(userId) {
        try {
            const userHistory = await this.historyRepository.findUserHistorys(userId);
            if (!userHistory) {
                return {
                    error: true,
                    message: 'No User History yet',
                    data: null,
                };
            }
            await this.historyRepository.deleteHistoryById(userId);
            return {
                error: false,
                message: 'History Cleared',
                data: null,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: `Error clearing history ${error.message}`,
                data: null,
            };
        }
    }
    async getHistory(userId) {
        try {
            const userHistory = await this.historyRepository.findUserHistorys(userId);
            if (!userHistory) {
                return {
                    error: true,
                    message: 'No User History yet',
                    data: null,
                };
            }
            return {
                error: false,
                message: 'History Retrieved Successfully',
                data: userHistory,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: `Error retrieving history ${error.message}`,
                data: null,
            };
        }
    }
    async markMovieWatched(movieId, userId) {
        try {
            const movie = await this.getMovieDetails(movieId);
            if (!movie) {
                return {
                    error: true,
                    message: 'Invalid Movie ID',
                    data: null,
                };
            }
            const movieData = {
                id: movie.id,
                poster_path: movie.poster_path,
                title: movie.title,
                release_date: movie.release_date,
                popularity: movie.popularity,
            };
            const userHistory = await this.historyRepository.findUserHistorys(userId);
            const today = new Date();
            const formattedDate = this.formatDate(today);
            if (!userHistory) {
                const historyData = {
                    userId: userId,
                    movies: [movieData],
                    streakDate: [formattedDate],
                };
                await this.historyRepository.createHistory(historyData);
                return {
                    error: false,
                    message: 'Movie marked as watched',
                    data: null,
                };
            }
            const movieExists = userHistory.movies.some((existingMovie) => existingMovie.id === movie.id);
            if (movieExists) {
                return {
                    error: true,
                    message: 'Movie is already watched',
                    data: null,
                };
            }
            const dateExists = userHistory.streakDate.includes(formattedDate);
            const updateData = {
                $push: { movies: movieData },
            };
            if (!dateExists) {
                updateData.$push.streakDate = formattedDate;
            }
            await this.historyRepository.updateHistory(userId, updateData);
            return {
                error: false,
                message: 'Movie Marked as Watched',
                data: null,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: `Error marking movie as watched ${error.message}`,
                data: null,
            };
        }
    }
    async calculateStreak(userId) {
        const history = await this.historyRepository.findUserHistorys(userId);
        if (!history ||
            !Array.isArray(history.streakDate) ||
            history.streakDate.length === 0) {
            return 0;
        }
        const sortedDates = history.streakDate
            .map((date) => new Date(date))
            .sort((a, b) => b.getTime() - a.getTime());
        let streakCount = 1;
        for (let i = 1; i < sortedDates.length; i++) {
            const diffInDays = (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
                (1000 * 60 * 60 * 24);
            if (diffInDays === 1) {
                streakCount++;
            }
            else {
                break;
            }
        }
        return streakCount;
    }
    async getPopularMovies(page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/movie/popular`, {
                params: {
                    api_key: this.tmdbApiKey,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching popular movies:', error.message);
            throw new common_1.HttpException({
                message: 'Failed to fetch popular movies',
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTopRatedMovies(page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/movie/top_rated`, {
                params: {
                    api_key: this.tmdbApiKey,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching top-rated movies:', error.message);
            throw new common_1.HttpException({
                message: 'Failed to fetch top-rated movies',
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTrendingMovies(page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/trending/movie/day`, {
                params: {
                    api_key: this.tmdbApiKey,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching trending movies:', error.message);
            throw new common_1.HttpException({
                message: 'Failed to fetch trending movies',
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getGenres() {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/genre/movie/list`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching genres:', error.message);
            throw new common_1.HttpException({ message: 'Failed to fetch genres', error: error.response?.data }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRecommendations(movieId, page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/movie/${movieId}/recommendations`, {
                params: {
                    api_key: this.tmdbApiKey,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching recommendations:', error.message);
            throw new common_1.HttpException({
                message: `Failed to fetch recommendations for movie ID ${movieId}`,
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchPeople(query, page) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/search/person`, {
                params: {
                    api_key: this.tmdbApiKey,
                    query,
                    page,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error searching for people:', error.message);
            throw new common_1.HttpException({ message: 'Failed to search for people', error: error.response?.data }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getVideos(movieId) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/movie/${movieId}/videos`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: 'en-US',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching videos:', error.message);
            throw new common_1.HttpException({
                message: `Failed to fetch videos for movie ID ${movieId}`,
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getImages(movieId) {
        try {
            const response = await axios_1.default.get(`${this.tmdbBaseUrl}/movie/${movieId}/images`, {
                params: {
                    api_key: this.tmdbApiKey,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching images:', error.message);
            throw new common_1.HttpException({
                message: `Failed to fetch images for movie ID ${movieId}`,
                error: error.response?.data,
            }, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        history_repository_1.HistoryRepository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map