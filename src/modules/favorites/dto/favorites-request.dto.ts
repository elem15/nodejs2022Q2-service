import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FavoritesRequestDto {
  @ApiProperty({ example: ['123f, 345s'], description: 'Ids of artists' })
  @IsString()
  artists: string[];
  @ApiProperty({ example: ['123f, 345s'], description: 'Ids of albums' })
  @IsString()
  albums: string[];
  @ApiProperty({ example: ['123f, 345s'], description: 'Ids of tracks' })
  @IsString()
  tracks: string[];
}