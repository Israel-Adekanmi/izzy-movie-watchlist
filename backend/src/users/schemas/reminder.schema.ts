import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema({ timestamps: true })
export class Reminder {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.Number, required: true }) // Movie ID for which the reminder is set
  movieId: number;

  @Prop({ type: MongooseSchema.Types.String, required: true }) // Movie ID for which the reminder is set
  movieTitle: string;

  @Prop({ type: MongooseSchema.Types.String, required: true }) // Movie ID for which the reminder is set
  email: string;

  @Prop({ type: MongooseSchema.Types.Date, required: true }) // Date & time of the reminder
  reminderTime: Date;

  @Prop({ type: MongooseSchema.Types.Boolean, default: false }) // Whether the reminder is already sent
  isSent: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
