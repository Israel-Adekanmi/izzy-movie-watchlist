import { ConfigService } from '@nestjs/config';
import { HistoryRepository } from './repositories/history.repository';
export declare class MoviesService {
    private readonly configService;
    private historyRepository;
    private readonly tmdbApiKey;
    private readonly tmdbBaseUrl;
    constructor(configService: ConfigService, historyRepository: HistoryRepository);
    private formatDate;
    searchMovies(query: string, page: number): Promise<any>;
    getMovieDetails(movieId: number): Promise<any>;
    deleteHistory(userId: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    getHistory(userId: string): Promise<{
        error: boolean;
        message: string;
        data: import("./schemas/history.schema").HistoryDocument;
    }>;
    markMovieWatched(movieId: number, userId: string): Promise<{
        error: boolean;
        message: string;
        data: any;
    }>;
    calculateStreak(userId: string): Promise<number>;
    getPopularMovies(page: number): Promise<any>;
    getTopRatedMovies(page: number): Promise<any>;
    getTrendingMovies(page: number): Promise<any>;
    getGenres(): Promise<any>;
    getRecommendations(movieId: number, page: number): Promise<any>;
    searchPeople(query: string, page: number): Promise<any>;
    getVideos(movieId: number): Promise<any>;
    getImages(movieId: number): Promise<any>;
}
