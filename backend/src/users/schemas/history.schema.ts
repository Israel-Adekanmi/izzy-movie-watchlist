import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: true, strict: false })
export class History {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: string;

  @Prop({
    type: [
      {
        id: { type: MongooseSchema.Types.Number, required: true },
        poster_path: { type: MongooseSchema.Types.String, required: true },
        title: { type: MongooseSchema.Types.String, required: true },
        release_date: { type: MongooseSchema.Types.String, required: true },
        popularity: { type: MongooseSchema.Types.Number, required: true },
      },
    ],
    default: [],
  })
  movies: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    popularity: number;
  }[];

  @Prop({ type: [MongooseSchema.Types.String], default: [] })
  streakDate: string[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
