import { CreateArtistDto as Artist } from '../../artist/dto/create-artist.dto';
import { CreateAlbumDto as Album } from '../../album/dto/create-album.dto';
import { CreateTrackDto as Track } from '../../track/dto/create-track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponseDto {
  @ApiProperty({ example: 'Artists obj', description: 'Artists list' })
  artists: (Artist | number)[];
  @ApiProperty({ example: 'Albums obj', description: 'Albums list' })
  albums: (Album | number)[];
  @ApiProperty({ example: 'Tracks obj', description: 'Tracks list' })
  tracks: (Track | number)[];
}