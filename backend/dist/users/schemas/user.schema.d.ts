import { Schema as MongooseSchema, Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    userId: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
