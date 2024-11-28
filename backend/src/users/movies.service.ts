import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { HistoryRepository } from './repositories/history.repository';

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey: string;
  private readonly tmdbBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private historyRepository: HistoryRepository,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
    this.tmdbBaseUrl = 'https://api.themoviedb.org/3';
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    return `${year}-${day}-${month}`;
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

  async deleteHistory(userId: string) {
    try {
      const userHistory = await this.historyRepository.findUserHistorys(userId);

      if (!userHistory) {
        return {
          error: true,
          message: 'No User History yet',
          data: null,
        };
      }

      await this.historyRepository.deleteHistoryById(userId);

      return {
        error: false,
        message: 'History Cleared',
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: `Error clearing history ${error.message}`,
        data: null,
      };
    }
  }

  async getHistory(userId: string) {
    try {
      const userHistory = await this.historyRepository.findUserHistorys(userId);

      if (!userHistory) {
        return {
          error: true,
          message: 'No User History yet',
          data: null,
        };
      }

      return {
        error: false,
        message: 'History Retrieved Successfully',
        data: userHistory,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: `Error retrieving history ${error.message}`,
        data: null,
      };
    }
  }

  async markMovieWatched(movieId: number, userId: string) {
    try {
      const movie = await this.getMovieDetails(movieId);

      if (!movie) {
        return {
          error: true,
          message: 'Invalid Movie ID',
          data: null,
        };
      }

      const movieData = {
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        popularity: movie.popularity,
      };

      const userHistory = await this.historyRepository.findUserHistorys(userId);

      const today = new Date();

      const formattedDate = this.formatDate(today);

      if (!userHistory) {
        const historyData = {
          userId: userId,
          movies: [movieData],
          streakDate: [formattedDate],
        };
        await this.historyRepository.createHistory(historyData);

        return {
          error: false,
          message: 'Movie marked as watched',
          data: null,
        };
      }

      const movieExists = userHistory.movies.some(
        (existingMovie) => existingMovie.id === movie.id,
      );

      if (movieExists) {
        return {
          error: true,
          message: 'Movie is already watched',
          data: null,
        };
      }

      const dateExists = userHistory.streakDate.includes(formattedDate);

      const updateData: any = {
        $push: { movies: movieData },
      };

      if (!dateExists) {
        updateData.$push.streakDate = formattedDate;
      }

      await this.historyRepository.updateHistory(userId, updateData);

      return {
        error: false,
        message: 'Movie Marked as Watched',
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: `Error marking movie as watched ${error.message}`,
        data: null,
      };
    }
  }

  async calculateStreak(userId: string): Promise<number> {
    const history = await this.historyRepository.findUserHistorys(userId);

    if (
      !history ||
      !Array.isArray(history.streakDate) ||
      history.streakDate.length === 0
    ) {
      return 0;
    }

    // Ensure dates are sorted in descending order
    const sortedDates = history.streakDate
      .map((date) => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    let streakCount = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diffInDays =
        (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
        (1000 * 60 * 60 * 24);

      if (diffInDays === 1) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount;
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
