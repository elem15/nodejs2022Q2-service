import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto { 
    id?: string; // uuid v4
    @ApiProperty({ example: 'name', description: 'Name of album'})
    @IsNotEmpty({ message: 'The name of album cannot be empty'})
    @IsString({ message: 'The name of album must be string'})
    name: string;
    @ApiProperty({ example: 1957, description: 'Year of presentation the album'})
    @IsNotEmpty({ message: 'The year cannot be empty'})
    @IsString({ message: 'The year must be string'})
    year: number;
    artistId?: string | null; // refers to Artist
    artistid?: string | null; // refers to Artist
  }