import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  id?: string;
  @ApiProperty({ example: 'name', description: 'Name of artist'})
  @IsNotEmpty({ message: 'The name of artist cannot be empty'})
  @IsString({ message: 'The name of artist must be string'})
  name: string;
  @ApiProperty({ example: true, description: "If the artist received a Grammy then true, else false"})
  @IsBoolean({ message: 'The Grammy of artist must be boolean'})
  grammy: boolean;
}