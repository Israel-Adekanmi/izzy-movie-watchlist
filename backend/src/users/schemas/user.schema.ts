import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, unique: true, required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  firstName: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  lastName: string;

  @Prop({ type: MongooseSchema.Types.String, default: '', required: false })
  gender: string;

  @Prop({ type: MongooseSchema.Types.String, required: true, unique: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  password: string;

  @Prop({ type: MongooseSchema.Types.Boolean, required: false, default: false })
  isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
