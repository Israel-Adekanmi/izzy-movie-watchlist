import { Injectable } from '@nestjs/common';
import { WatchlistRepository } from './repositories/watchlist.repository';
import { MoviesService } from './movies.service';

@Injectable()
export class WatchlistService {
  constructor(
    private readonly watchlistRepository: WatchlistRepository,
    private movieService: MoviesService,
  ) {}
  private generateUserId(): string {
    const length = 24; // 24 characters hexadecimal
    const characters = 'abcdef0123456789';
    let userId = '';

    // Generate random hexadecimal characters
    for (let i = 0; i < length; i++) {
      userId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return userId;
  }

  async createWatchlist(userId: string, name: string, description: string) {
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
    } catch (error) {
      return {
        error: true,
        message: `Error creating watchlist: ${error.message}`,
        data: null,
      };
    }
  }

  async editWatchlist(watchlistId: string, name: string, description: string) {
    try {
      const updatedWatchlist = await this.watchlistRepository.updateWatchlist(
        watchlistId,
        {
          name,
          description,
        },
      );

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
    } catch (error) {
      return {
        error: true,
        message: `Error updating watchlist: ${error.message}`,
        data: null,
      };
    }
  }

  async addMovieToWatchlist(watchlistId: string, movieId: number) {
    try {
      const movieData = await this.movieService.getMovieDetails(movieId);
      //   console.log('Fetched movie data:', movieData);
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

      // Check if movie already exists in the watchlist
      const watchlist =
        await this.watchlistRepository.findWatchlistById(watchlistId);

      if (!watchlist) {
        return {
          error: true,
          message: 'Watchlist not found',
          data: null,
        };
      }

      const movieExists = watchlist.movies.some(
        (existingMovie) => existingMovie.id === movie.id,
      );

      if (movieExists) {
        return {
          error: true,
          message: 'Movie is already in the watchlist',
          data: null,
        };
      }

      //   console.log('movie', movie);
      const updatedWatchlist =
        await this.watchlistRepository.addMovieToWatchlist(watchlistId, movie);

      return {
        error: false,
        message: 'Movie added to watchlist successfully',
        data: updatedWatchlist,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error adding movie to watchlist: ${error.message}`,
        data: null,
      };
    }
  }

  async removeMovieFromWatchlist(watchlistId: string, movieId: number) {
    try {
      const updatedWatchlist =
        await this.watchlistRepository.removeMovieFromWatchlist(
          watchlistId,
          movieId,
        );

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
    } catch (error) {
      return {
        error: true,
        message: `Error removing movie from watchlist: ${error.message}`,
        data: null,
      };
    }
  }

  async getUserWatchlists(userId: string) {
    try {
      const watchlists =
        await this.watchlistRepository.findUserWatchlists(userId);

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
    } catch (error) {
      return {
        error: true,
        message: `Error fetching user watchlists: ${error.message}`,
        data: null,
      };
    }
  }

  async getWatchlistById(watchId: string) {
    try {
      const watchlists =
        await this.watchlistRepository.findWatchlistById(watchId);

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
    } catch (error) {
      return {
        error: true,
        message: `Error fetching user watchlists: ${error.message}`,
        data: null,
      };
    }
  }
}
