import { ConfigService } from '@nestjs/config';
export declare class MoviesService {
    private readonly configService;
    private readonly tmdbApiKey;
    private readonly tmdbBaseUrl;
    constructor(configService: ConfigService);
    searchMovies(query: string, page: number): Promise<any>;
    getMovieDetails(movieId: number): Promise<any>;
    getPopularMovies(page: number): Promise<any>;
    getTopRatedMovies(page: number): Promise<any>;
    getTrendingMovies(page: number): Promise<any>;
    getGenres(): Promise<any>;
    getRecommendations(movieId: number, page: number): Promise<any>;
    searchPeople(query: string, page: number): Promise<any>;
    getVideos(movieId: number): Promise<any>;
    getImages(movieId: number): Promise<any>;
}
