import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto { 
  @IsString()
  id?: string;
  @ApiProperty({ example: 'name', description: 'Name of track' })
  @IsNotEmpty({ message: 'The name of track cannot be empty' })
  @IsString({ message: 'The name of track must be string' })
  name: string;
  @ApiProperty({ example: 255, description: 'Duration fo track' })
  @IsNumber()
  duration: number; // integer number
  @ApiProperty({ example: '12-f3', description: 'Id existing artist' })
  @IsString()
  artistId?: string; // refers to Artist
  artistid?: string
  @ApiProperty({ example: '12-f3', description: 'Id existing artist' })
  @IsString()
  albumId?: string; // refers to Album
  albumid?: string; // refers to Album
}