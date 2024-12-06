import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from '../schemas/reminder.schema';
export declare class ReminderRepository {
    private readonly reminderModel;
    constructor(reminderModel: Model<ReminderDocument>);
    createReminder(reminderData: Partial<Reminder>): Promise<ReminderDocument>;
    findReminderById(reminderId: string): Promise<ReminderDocument | null>;
    findPendingReminders(currentTime: Date): Promise<ReminderDocument[]>;
    markReminderAsSent(reminderId: string): Promise<void>;
    findUserReminders(userId: string): Promise<ReminderDocument[]>;
    updateReminder(userId: string, updateData: Partial<Reminder>): Promise<ReminderDocument | null>;
    addMovieToReminder(userId: string, movie: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }): Promise<ReminderDocument | null>;
    addMovieAndDateToReminder(userId: string, movie: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }, date: string): Promise<ReminderDocument | null>;
    deleteReminderById(id: string): Promise<ReminderDocument>;
}
