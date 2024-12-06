import { UsersService } from './user.service';
import { CreateUserDto, ForgotPassDto, LoginDto, SetReminderDto, tokenDto, UpdateProfile } from './dto/create-user.dto';
import { MoviesService } from './movies.service';
import { WatchlistService } from './watchlist.service';
import { AddMovieDto, CreateWatchlistDto, EditWatchlistDto, RemoveMovieDto } from './dto/watchlist.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly watchlistService;
    private moviesService;
    constructor(usersService: UsersService, watchlistService: WatchlistService, moviesService: MoviesService);
    signup(createUser: CreateUserDto): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    verifyUserEmail(tokenData: tokenDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
    login(loginDto: LoginDto): Promise<any>;
    userForgotPassword(emailPass: ForgotPassDto): Promise<{
        error: boolean;
        message: string;
        data: any;
    } | {
        error: string;
        message: any;
        data?: undefined;
    }>;
    getProfile(req: any): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
    updateProfile(req: any, updateData: UpdateProfile): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/user.schema").UserDocument;
    }>;
    searchMovies(query: string, page: number): Promise<any>;
    getMovieDetails(id: number): Promise<any>;
    markMovie(id: number, req: any): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    getHistory(req: any): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/history.schema").HistoryDocument;
    }>;
    deleteHistory(req: any): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    getCurrentStreak(req: any): Promise<number>;
    getPopularMovies(page: number): Promise<any>;
    getTopRatedMovies(page: number): Promise<any>;
    getTrendingMovies(page: number): Promise<any>;
    getGenres(): Promise<any>;
    getRecommendations(id: number, page: number): Promise<any>;
    fetchMoviesByMood(genre: string): Promise<any>;
    searchPeople(query: string, page: number): Promise<any>;
    getVideos(id: number): Promise<any>;
    getImages(id: number): Promise<any>;
    createWatchlist(req: any, createWatchlistDto: CreateWatchlistDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    editWatchlist(editWatchlistDto: EditWatchlistDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    addMovieToWatchlist(addMovieDto: AddMovieDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    removeMovieFromWatchlist(removeMovieDto: RemoveMovieDto): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    getUserWatchlists(req: any): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument[];
    }>;
    getWatchlistById(id: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/watchlist.schema").WatchlistDocument;
    }>;
    deleteWatchlist(watchlistId: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    setReminder(req: any, setReminderData: SetReminderDto): Promise<any>;
    getUserReminders(req: any): Promise<any>;
    deleteReminder(id: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    markReminderSent(reminderId: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
}
