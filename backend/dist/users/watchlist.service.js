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
exports.WatchlistService = void 0;
const common_1 = require("@nestjs/common");
const watchlist_repository_1 = require("./repositories/watchlist.repository");
const movies_service_1 = require("./movies.service");
let WatchlistService = class WatchlistService {
    constructor(watchlistRepository, movieService) {
        this.watchlistRepository = watchlistRepository;
        this.movieService = movieService;
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
    async createWatchlist(userId, name, description) {
        try {
            const watchlistId = this.generateUserId();
            const watchlist = await this.watchlistRepository.createWatchlist({
                userId,
                name,
                watchlistId,
                description,
            });
            return {
                error: false,
                message: 'Watchlist created successfully',
                data: watchlist,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error creating watchlist: ${error.message}`,
                data: null,
            };
        }
    }
    async editWatchlist(watchlistId, name, description) {
        try {
            const updatedWatchlist = await this.watchlistRepository.updateWatchlist(watchlistId, {
                name,
                description,
            });
            if (!updatedWatchlist) {
                return {
                    error: true,
                    message: 'Watchlist not found',
                    data: null,
                };
            }
            return {
                error: false,
                message: 'Watchlist updated successfully',
                data: updatedWatchlist,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error updating watchlist: ${error.message}`,
                data: null,
            };
        }
    }
    async addMovieToWatchlist(watchlistId, movieId) {
        try {
            const movieData = await this.movieService.getMovieDetails(movieId);
            if (!movieData) {
                return {
                    error: true,
                    message: 'Invalid Movie ID',
                    data: null,
                };
            }
            const movie = {
                id: movieData.id,
                poster_path: movieData.poster_path,
                title: movieData.title,
                release_date: movieData.release_date,
                popularity: movieData.popularity,
            };
            const watchlist = await this.watchlistRepository.findWatchlistById(watchlistId);
            if (!watchlist) {
                return {
                    error: true,
                    message: 'Watchlist not found',
                    data: null,
                };
            }
            const movieExists = watchlist.movies.some((existingMovie) => existingMovie.id === movie.id);
            if (movieExists) {
                return {
                    error: true,
                    message: 'Movie is already in the watchlist',
                    data: null,
                };
            }
            const updatedWatchlist = await this.watchlistRepository.addMovieToWatchlist(watchlistId, movie);
            return {
                error: false,
                message: 'Movie added to watchlist successfully',
                data: updatedWatchlist,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error adding movie to watchlist: ${error.message}`,
                data: null,
            };
        }
    }
    async removeMovieFromWatchlist(watchlistId, movieId) {
        try {
            const updatedWatchlist = await this.watchlistRepository.removeMovieFromWatchlist(watchlistId, movieId);
            if (!updatedWatchlist) {
                return {
                    error: true,
                    message: 'Watchlist not found',
                    data: null,
                };
            }
            return {
                error: false,
                message: 'Movie removed from watchlist successfully',
                data: updatedWatchlist,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error removing movie from watchlist: ${error.message}`,
                data: null,
            };
        }
    }
    async getUserWatchlists(userId) {
        try {
            const watchlists = await this.watchlistRepository.findUserWatchlists(userId);
            if (watchlists.length < 1) {
                return {
                    error: true,
                    message: 'No Watchlist Available',
                    data: null,
                };
            }
            return {
                error: false,
                message: 'User watchlists retrieved successfully',
                data: watchlists,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error fetching user watchlists: ${error.message}`,
                data: null,
            };
        }
    }
    async getWatchlistById(watchId) {
        try {
            const watchlists = await this.watchlistRepository.findWatchlistById(watchId);
            if (!watchlists) {
                return {
                    error: true,
                    message: 'Invalid ID',
                    data: null,
                };
            }
            return {
                error: false,
                message: 'User watchlists retrieved successfully',
                data: watchlists,
            };
        }
        catch (error) {
            return {
                error: true,
                message: `Error fetching user watchlists: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.WatchlistService = WatchlistService;
exports.WatchlistService = WatchlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [watchlist_repository_1.WatchlistRepository,
        movies_service_1.MoviesService])
], WatchlistService);
//# sourceMappingURL=watchlist.service.js.map