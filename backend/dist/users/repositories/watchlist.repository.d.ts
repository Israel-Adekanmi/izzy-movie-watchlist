import { Model } from 'mongoose';
import { Watchlist, WatchlistDocument } from '../schemas/watchlist.schema';
export declare class WatchlistRepository {
    private readonly watchlistModel;
    constructor(watchlistModel: Model<WatchlistDocument>);
    createWatchlist(watchlistData: Partial<Watchlist>): Promise<WatchlistDocument>;
    findWatchlistById(watchlistId: string): Promise<WatchlistDocument | null>;
    findUserWatchlists(userId: string): Promise<WatchlistDocument[]>;
    updateWatchlist(watchlistId: string, updateData: Partial<Watchlist>): Promise<WatchlistDocument | null>;
    addMovieToWatchlist(watchlistId: string, movie: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }): Promise<WatchlistDocument | null>;
    removeMovieFromWatchlist(watchlistId: string, movieId: number): Promise<WatchlistDocument | null>;
}
