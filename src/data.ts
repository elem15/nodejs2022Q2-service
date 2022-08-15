import { CreateArtistDto } from "./modules/artist/dto/create-artist.dto";
import { FavoritesRequestDto } from "./modules/favorites/dto/favorites-request.dto";
import { CreateAlbumDto } from './modules/album/dto/create-album.dto';
import { CreateTrackDto } from "./modules/track/dto/create-track.dto";
import { UserDto } from "./modules/user/dto/user.dto";
export default {
    artists: [] as CreateArtistDto[],
    albums: [] as CreateAlbumDto[],
    tracks: [] as CreateTrackDto[],
    users: [] as UserDto[],
    favorites: {
        artists: [],
        albums: [],
        tracks: [],
    } as FavoritesRequestDto,
}