import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from '../schemas/history.schema';

@Injectable()
export class HistoryRepository {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}

  async createHistory(historyData: Partial<History>): Promise<HistoryDocument> {
    return await this.historyModel.create(historyData);
  }

  async findHistoryById(historyId: string): Promise<HistoryDocument | null> {
    return await this.historyModel.findOne({ historyId });
  }

  async findUserHistorys(userId: string): Promise<HistoryDocument> {
    return await this.historyModel.findOne({ userId });
  }

  async updateHistory(
    userId: string,
    updateData: Partial<History>,
  ): Promise<HistoryDocument | null> {
    return await this.historyModel.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
  }

  async addMovieToHistory(
    userId: string,
    movie: {
      id: number;
      poster_path: string;
      title: string;
      release_date: string;
      popularity: number;
    },
  ): Promise<HistoryDocument | null> {
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

      // Update the history by pushing the new movie
      return await this.historyModel.findOneAndUpdate(
        { userId },
        { $push: { movies: movie } },
        { new: true, upsert: false },
      );
    } catch (error) {
      console.error('Error adding movie to history:', error);
      return null;
    }
  }

  async addMovieAndDateToHistory(
    userId: string,
    movie: {
      id: number;
      poster_path: string;
      title: string;
      release_date: string;
      popularity: number;
    },
    date: string,
  ): Promise<HistoryDocument | null> {
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

      // Update the history by pushing the new movie
      return await this.historyModel.findOneAndUpdate(
        { userId },
        { $push: { movies: movie, streakDate: date } },
        { new: true, upsert: false },
      );
    } catch (error) {
      console.error('Error adding movie to history:', error);
      return null;
    }
  }

  async deleteHistoryById(userId: string): Promise<HistoryDocument> {
    const deletedToken = await this.historyModel.findOneAndDelete({
      userId,
    });
    return deletedToken;
  }
}
