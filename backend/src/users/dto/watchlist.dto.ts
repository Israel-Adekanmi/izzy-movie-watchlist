import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWatchlistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class EditWatchlistDto {
  @ApiProperty()
  @IsString()
  watchlistId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class AddMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  watchlistId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movieId: number;
}

export class RemoveMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  watchlistId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movieId: number;
}
