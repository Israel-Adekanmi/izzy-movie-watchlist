import { Schema as MongooseSchema, Document } from 'mongoose';
export type WatchlistDocument = Watchlist & Document;
export declare class Watchlist {
    userId: string;
    watchlistId: string;
    name: string;
    description: string;
    movies: {
        id: number;
        poster_path: string;
        title: string;
        release_date: string;
        popularity: number;
    }[];
}
export declare const WatchlistSchema: MongooseSchema<Watchlist, import("mongoose").Model<Watchlist, any, any, any, Document<unknown, any, Watchlist> & Watchlist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Watchlist, Document<unknown, {}, import("mongoose").FlatRecord<Watchlist>> & import("mongoose").FlatRecord<Watchlist> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
