import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type WatchlistDocument = Watchlist & Document;

@Schema({ timestamps: true, strict: false })
export class Watchlist {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  watchlistId: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.String, default: '' })
  description: string;

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
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
