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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const movies_service_1 = require("./movies.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const watchlist_service_1 = require("./watchlist.service");
const watchlist_dto_1 = require("./dto/watchlist.dto");
let UsersController = class UsersController {
    constructor(usersService, watchlistService, moviesService) {
        this.usersService = usersService;
        this.watchlistService = watchlistService;
        this.moviesService = moviesService;
    }
    async signup(createUser) {
        return await this.usersService.create(createUser);
    }
    async verifyUserEmail(tokenData) {
        return await this.usersService.verifyUserEmail(tokenData);
    }
    async login(loginDto) {
        const loginData = await this.usersService.userLogIn(loginDto.email, loginDto.password);
        return loginData;
    }
    async userForgotPassword(emailPass) {
        const forgotPass = await this.usersService.userForgotPassword(emailPass.email);
        return forgotPass;
    }
    async getProfile(req) {
        return await this.usersService.getUserProfile(req.user.userId);
    }
    async updateProfile(req, updateData) {
        return await this.usersService.updateUserProfile(req.user.userId, updateData);
    }
    async searchMovies(query, page) {
        if (!query) {
            return { error: true, message: 'Query parameter is required' };
        }
        return await this.moviesService.searchMovies(query, page);
    }
    async getMovieDetails(id) {
        return await this.moviesService.getMovieDetails(id);
    }
    async markMovie(id, req) {
        return await this.moviesService.markMovieWatched(id, req.user.userId);
    }
    async getHistory(req) {
        return await this.moviesService.getHistory(req.user.userId);
    }
    async deleteHistory(req) {
        return await this.moviesService.deleteHistory(req.user.userId);
    }
    async getCurrentStreak(req) {
        return await this.moviesService.calculateStreak(req.user.userId);
    }
    async getPopularMovies(page) {
        return await this.moviesService.getPopularMovies(page);
    }
    async getTopRatedMovies(page) {
        return await this.moviesService.getTopRatedMovies(page);
    }
    async getTrendingMovies(page) {
        return await this.moviesService.getTrendingMovies(page);
    }
    async getGenres() {
        return await this.moviesService.getGenres();
    }
    async getRecommendations(id, page) {
        return await this.moviesService.getRecommendations(id, page);
    }
    async searchPeople(query, page) {
        if (!query) {
            return { error: true, message: 'Query parameter is required' };
        }
        return await this.moviesService.searchPeople(query, page);
    }
    async getVideos(id) {
        return await this.moviesService.getVideos(id);
    }
    async getImages(id) {
        return await this.moviesService.getImages(id);
    }
    async createWatchlist(req, createWatchlistDto) {
        const { name, description } = createWatchlistDto;
        return await this.watchlistService.createWatchlist(req.user.userId, name, description);
    }
    async editWatchlist(editWatchlistDto) {
        const { watchlistId, name, description } = editWatchlistDto;
        return await this.watchlistService.editWatchlist(watchlistId, name, description);
    }
    async addMovieToWatchlist(addMovieDto) {
        const { watchlistId, movieId } = addMovieDto;
        return await this.watchlistService.addMovieToWatchlist(watchlistId, movieId);
    }
    async removeMovieFromWatchlist(removeMovieDto) {
        const { watchlistId, movieId } = removeMovieDto;
        return await this.watchlistService.removeMovieFromWatchlist(watchlistId, movieId);
    }
    async getUserWatchlists(req) {
        return await this.watchlistService.getUserWatchlists(req.user.userId);
    }
    async getWatchlistById(id) {
        return await this.watchlistService.getWatchlistById(id);
    }
    async deleteWatchlist(watchlistId) {
        return await this.watchlistService.deleteWatchlistById(watchlistId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Sign up for new user',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/verify-email'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        description: 'Verify user email',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.tokenDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyUserEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'User login',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        description: 'User forgot password, send reset email',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.ForgotPassDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userForgotPassword", null);
__decorate([
    (0, common_1.Get)('get-profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Get user profile',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('update-profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Update user profile',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.UpdateProfile]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Search for movies by query with pagination',
    }),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Get)('get-movie/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get details of a specific movie',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMovieDetails", null);
__decorate([
    (0, common_1.Post)('mark-watched/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Mark a movie as watched by ID',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "markMovie", null);
__decorate([
    (0, common_1.Get)('get-movie-history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get user movie history',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Delete)('delete-history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Delete History',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteHistory", null);
__decorate([
    (0, common_1.Get)('get-current-streak'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get user current streak',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentStreak", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Fetch popular movies with pagination',
    }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPopularMovies", null);
__decorate([
    (0, common_1.Get)('top-rated'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get top-rated movies with pagination',
    }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTopRatedMovies", null);
__decorate([
    (0, common_1.Get)('trending'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get trending movies with pagination',
    }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTrendingMovies", null);
__decorate([
    (0, common_1.Get)('genres'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get list of movie genres',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getGenres", null);
__decorate([
    (0, common_1.Get)('recommendations/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get movie recommendations with pagination',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRecommendations", null);
__decorate([
    (0, common_1.Get)('people/search'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Search for actors, directors, or crew members by name with pagination',
    }),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchPeople", null);
__decorate([
    (0, common_1.Get)('videos/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get trailers and other videos for a specific movie',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getVideos", null);
__decorate([
    (0, common_1.Get)('images/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get posters, backdrops, and other images for a movie',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getImages", null);
__decorate([
    (0, common_1.Post)('watchlist/create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Create Watchlist',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, watchlist_dto_1.CreateWatchlistDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createWatchlist", null);
__decorate([
    (0, common_1.Put)('watchlist/edit'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Edit Watchlist',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [watchlist_dto_1.EditWatchlistDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editWatchlist", null);
__decorate([
    (0, common_1.Post)('watchlist/add-movie'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Add movie to Watchlist',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [watchlist_dto_1.AddMovieDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addMovieToWatchlist", null);
__decorate([
    (0, common_1.Delete)('watchlist/remove-movie'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Remove movie from Watchlist',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [watchlist_dto_1.RemoveMovieDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeMovieFromWatchlist", null);
__decorate([
    (0, common_1.Get)('user-watchlists'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Get User Watchlist',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserWatchlists", null);
__decorate([
    (0, common_1.Get)('watchlist/details/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Get Single Watchlist',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getWatchlistById", null);
__decorate([
    (0, common_1.Delete)('delete-watchlist/:watchlistId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Delete Watchlist',
    }),
    __param(0, (0, common_1.Param)('watchlistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteWatchlist", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        watchlist_service_1.WatchlistService,
        movies_service_1.MoviesService])
], UsersController);
//# sourceMappingURL=user.controller.js.map