import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type EmailVerificationTokenDocument = EmailVerificationToken & Document;

@Schema({ strict: false })
export class EmailVerificationToken {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  token: string;

  @Prop({ type: MongooseSchema.Types.String, unique: true, required: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  updatedAt?: Date;
}

export const EmailVerificationTokenSchema = SchemaFactory.createForClass(
  EmailVerificationToken,
);
