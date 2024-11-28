import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Watchlist, WatchlistDocument } from '../schemas/watchlist.schema';

@Injectable()
export class WatchlistRepository {
  constructor(
    @InjectModel(Watchlist.name)
    private readonly watchlistModel: Model<WatchlistDocument>,
  ) {}

  async createWatchlist(
    watchlistData: Partial<Watchlist>,
  ): Promise<WatchlistDocument> {
    return await this.watchlistModel.create(watchlistData);
  }

  async findWatchlistById(
    watchlistId: string,
  ): Promise<WatchlistDocument | null> {
    return await this.watchlistModel.findOne({ watchlistId });
  }

  async findUserWatchlists(userId: string): Promise<WatchlistDocument[]> {
    return await this.watchlistModel.find({ userId });
  }

  async updateWatchlist(
    watchlistId: string,
    updateData: Partial<Watchlist>,
  ): Promise<WatchlistDocument | null> {
    return await this.watchlistModel.findOneAndUpdate(
      { watchlistId },
      updateData,
      { new: true },
    );
  }

  async addMovieToWatchlist(
    watchlistId: string,
    movie: {
      id: number;
      poster_path: string;
      title: string;
      release_date: string;
      popularity: number;
    },
  ): Promise<WatchlistDocument | null> {
    try {
      // Validate the movie structure (Optional, can be enhanced)
      if (
        !movie.id ||
        !movie.poster_path ||
        !movie.title ||
        !movie.release_date ||
        !movie.popularity
      ) {
        throw new Error('Invalid movie data');
      }

      // Update the watchlist by pushing the new movie
      return await this.watchlistModel.findOneAndUpdate(
        { watchlistId },
        { $push: { movies: movie } },
        { new: true, upsert: false },
      );
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      return null;
    }
  }

  async removeMovieFromWatchlist(
    watchlistId: string,
    movieId: number,
  ): Promise<WatchlistDocument | null> {
    return await this.watchlistModel.findOneAndUpdate(
      { watchlistId },
      { $pull: { movies: { id: movieId } } },
      { new: true },
    );
  }

  async deleteWatchlistById(watchlistId: string): Promise<WatchlistDocument> {
    const deletedToken = await this.watchlistModel.findOneAndDelete({
      watchlistId,
    });
    return deletedToken;
  }
}
