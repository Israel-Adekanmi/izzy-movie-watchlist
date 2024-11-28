import { Schema as MongooseSchema, Document } from 'mongoose';
export type HistoryDocument = History & Document;
export declare class History {
    userId: string;
    movies: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }[];
    streakDate: string[];
}
export declare const HistorySchema: MongooseSchema<History, import("mongoose").Model<History, any, any, any, Document<unknown, any, History> & History & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, History, Document<unknown, {}, import("mongoose").FlatRecord<History>> & import("mongoose").FlatRecord<History> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
