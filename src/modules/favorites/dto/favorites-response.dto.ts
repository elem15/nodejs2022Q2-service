import { CreateArtistDto as Artist } from '../../artist/dto/create-artist.dto';
import { CreateAlbumDto as Album } from '../../album/dto/create-album.dto';
import { CreateTrackDto as Track } from '../../track/dto/create-track.dto';

export interface FavoritesResponseDto {
    artists: (Artist | number)[];
    albums: (Album | number)[];
    tracks: (Track | number)[];
  }