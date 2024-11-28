import { Model } from 'mongoose';
import { History, HistoryDocument } from '../schemas/history.schema';
export declare class HistoryRepository {
    private readonly historyModel;
    constructor(historyModel: Model<HistoryDocument>);
    createHistory(historyData: Partial<History>): Promise<HistoryDocument>;
    findHistoryById(historyId: string): Promise<HistoryDocument | null>;
    findUserHistorys(userId: string): Promise<HistoryDocument>;
    updateHistory(userId: string, updateData: Partial<History>): Promise<HistoryDocument | null>;
    addMovieToHistory(userId: string, movie: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }): Promise<HistoryDocument | null>;
    addMovieAndDateToHistory(userId: string, movie: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }, date: string): Promise<HistoryDocument | null>;
    deleteHistoryById(userId: string): Promise<HistoryDocument>;
}
