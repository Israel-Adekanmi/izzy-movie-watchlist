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
let MoviesService = class MoviesService {
    constructor(configService) {
        this.configService = configService;
        this.tmdbApiKey = this.configService.get('TMDB_API_KEY');
        this.tmdbBaseUrl = 'https://api.themoviedb.org/3';
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map