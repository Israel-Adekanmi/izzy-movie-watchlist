export declare class CreateWatchlistDto {
    name: string;
    description?: string;
}
export declare class EditWatchlistDto {
    watchlistId: string;
    name?: string;
    description?: string;
}
export declare class AddMovieDto {
    watchlistId: string;
    movieId: number;
}
export declare class RemoveMovieDto {
    watchlistId: string;
    movieId: number;
}
