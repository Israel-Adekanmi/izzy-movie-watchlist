import { Schema as MongooseSchema, Document } from 'mongoose';
export type ReminderDocument = Reminder & Document;
export declare class Reminder {
    userId: string;
    movieId: number;
    movieTitle: string;
    email: string;
    reminderTime: Date;
    isSent: boolean;
}
export declare const ReminderSchema: MongooseSchema<Reminder, import("mongoose").Model<Reminder, any, any, any, Document<unknown, any, Reminder> & Reminder & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reminder, Document<unknown, {}, import("mongoose").FlatRecord<Reminder>> & import("mongoose").FlatRecord<Reminder> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
