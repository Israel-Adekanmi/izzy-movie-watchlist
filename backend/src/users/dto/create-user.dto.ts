import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Gender } from '../types/user.type';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}

export class SetReminderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reminderTime: string;
}

export class UpdateProfile {
  @ApiPropertyOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class tokenDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  token: string;
}

export class ForgotPassDto {
  @ApiProperty()
  @IsString()
  email: string;
}

export class UpdateTokenDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
