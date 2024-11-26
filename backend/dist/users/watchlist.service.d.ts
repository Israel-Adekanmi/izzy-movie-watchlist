import { WatchlistRepository } from './repositories/watchlist.repository';
import { MoviesService } from './movies.service';
export declare class WatchlistService {
    private readonly watchlistRepository;
    private movieService;
    constructor(watchlistRepository: WatchlistRepository, movieService: MoviesService);
    private generateUserId;
    createWatchlist(userId: string, name: string, description: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    editWatchlist(watchlistId: string, name: string, description: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    addMovieToWatchlist(watchlistId: string, movieId: number): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    removeMovieFromWatchlist(watchlistId: string, movieId: number): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    getUserWatchlists(userId: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument[];
    }>;
    getWatchlistById(watchId: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
}
