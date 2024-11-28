import { Schema as MongooseSchema, Document } from 'mongoose';
export type EmailVerificationTokenDocument = EmailVerificationToken & Document;
export declare class EmailVerificationToken {
    token: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const EmailVerificationTokenSchema: MongooseSchema<EmailVerificationToken, import("mongoose").Model<EmailVerificationToken, any, any, any, Document<unknown, any, EmailVerificationToken> & EmailVerificationToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailVerificationToken, Document<unknown, {}, import("mongoose").FlatRecord<EmailVerificationToken>> & import("mongoose").FlatRecord<EmailVerificationToken> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
