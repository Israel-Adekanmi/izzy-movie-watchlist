import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from '../schemas/reminder.schema';

@Injectable()
export class ReminderRepository {
  constructor(
    @InjectModel(Reminder.name)
    private readonly reminderModel: Model<ReminderDocument>,
  ) {}

  async createReminder(
    reminderData: Partial<Reminder>,
  ): Promise<ReminderDocument> {
    return await this.reminderModel.create(reminderData);
  }

  async findReminderById(reminderId: string): Promise<ReminderDocument | null> {
    return await this.reminderModel.findOne({ reminderId });
  }

  async findPendingReminders(currentTime: Date): Promise<ReminderDocument[]> {
    return this.reminderModel.find({
      reminderTime: { $lte: currentTime },
      isSent: false,
    });
  }

  async markReminderAsSent(reminderId: string): Promise<void> {
    await this.reminderModel.updateOne({ _id: reminderId }, { isSent: true });
  }

  async findUserReminders(userId: string): Promise<ReminderDocument[]> {
    return await this.reminderModel.find({
      userId,
    });
  }

  async updateReminder(
    userId: string,
    updateData: Partial<Reminder>,
  ): Promise<ReminderDocument | null> {
    return await this.reminderModel.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
  }

  async addMovieToReminder(
    userId: string,
    movie: {
      id: number;
      poster_path: string;
      title: string;
      release_date: string;
      popularity: number;
    },
  ): Promise<ReminderDocument | null> {
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

      // Update the reminder by pushing the new movie
      return await this.reminderModel.findOneAndUpdate(
        { userId },
        { $push: { movies: movie } },
        { new: true, upsert: false },
      );
    } catch (error) {
      console.error('Error adding movie to reminder:', error);
      return null;
    }
  }

  async addMovieAndDateToReminder(
    userId: string,
    movie: {
      id: number;
      poster_path: string;
      title: string;
      release_date: string;
      popularity: number;
    },
    date: string,
  ): Promise<ReminderDocument | null> {
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

      // Update the reminder by pushing the new movie
      return await this.reminderModel.findOneAndUpdate(
        { userId },
        { $push: { movies: movie, streakDate: date } },
        { new: true, upsert: false },
      );
    } catch (error) {
      console.error('Error adding movie to reminder:', error);
      return null;
    }
  }

  async deleteReminderById(id: string): Promise<ReminderDocument> {
    const deletedToken = await this.reminderModel.findOneAndDelete({
      _id: id,
    });
    return deletedToken;
  }
}
