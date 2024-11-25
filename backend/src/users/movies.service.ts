import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey: string;
  private readonly tmdbBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
    this.tmdbBaseUrl = 'https://api.themoviedb.org/3';
  }

  // Search for movies by query
  async searchMovies(query: string, page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/search/movie`, {
        params: {
          api_key: this.tmdbApiKey,
          query,
          page,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error.message);
      throw new HttpException(
        { message: 'Failed to search movies', error: error.response?.data },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get details of a specific movie by ID
  async getMovieDetails(movieId: number): Promise<any> {
    const url = `${this.tmdbBaseUrl}/movie/${movieId}`;
    const response = await axios.get(url, {
      params: {
        api_key: this.tmdbApiKey,
        language: 'en-US',
      },
    });
    return response.data;
  }

  // Fetch popular movies
  async getPopularMovies(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/popular`, {
        params: {
          api_key: this.tmdbApiKey,
          page,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error.message);
      throw new HttpException(
        {
          message: 'Failed to fetch popular movies',
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch top-rated movies
  async getTopRatedMovies(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/top_rated`, {
        params: {
          api_key: this.tmdbApiKey,
          page,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top-rated movies:', error.message);
      throw new HttpException(
        {
          message: 'Failed to fetch top-rated movies',
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch trending movies
  async getTrendingMovies(page: number): Promise<any> {
    try {
      const response = await axios.get(
        `${this.tmdbBaseUrl}/trending/movie/day`,
        {
          params: {
            api_key: this.tmdbApiKey,
            page,
            language: 'en-US',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error.message);
      throw new HttpException(
        {
          message: 'Failed to fetch trending movies',
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getGenres(): Promise<any> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/genre/movie/list`, {
        params: {
          api_key: this.tmdbApiKey,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error.message);
      throw new HttpException(
        { message: 'Failed to fetch genres', error: error.response?.data },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch movie recommendations
  async getRecommendations(movieId: number, page: number): Promise<any> {
    try {
      const response = await axios.get(
        `${this.tmdbBaseUrl}/movie/${movieId}/recommendations`,
        {
          params: {
            api_key: this.tmdbApiKey,
            page,
            language: 'en-US',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      throw new HttpException(
        {
          message: `Failed to fetch recommendations for movie ID ${movieId}`,
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Search for people
  async searchPeople(query: string, page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/search/person`, {
        params: {
          api_key: this.tmdbApiKey,
          query,
          page,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching for people:', error.message);
      throw new HttpException(
        { message: 'Failed to search for people', error: error.response?.data },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch trailers and videos for a movie
  async getVideos(movieId: number): Promise<any> {
    try {
      const response = await axios.get(
        `${this.tmdbBaseUrl}/movie/${movieId}/videos`,
        {
          params: {
            api_key: this.tmdbApiKey,
            language: 'en-US',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error.message);
      throw new HttpException(
        {
          message: `Failed to fetch videos for movie ID ${movieId}`,
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Fetch movie images
  async getImages(movieId: number): Promise<any> {
    try {
      const response = await axios.get(
        `${this.tmdbBaseUrl}/movie/${movieId}/images`,
        {
          params: {
            api_key: this.tmdbApiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error.message);
      throw new HttpException(
        {
          message: `Failed to fetch images for movie ID ${movieId}`,
          error: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
