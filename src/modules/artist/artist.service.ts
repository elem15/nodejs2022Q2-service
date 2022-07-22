import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { CreateArtistDto } from "./dto/create-artist.dto";
import {v4 as uuidv4, validate} from 'uuid';
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import data from '../../data';
import { AlbumService } from '../album/album.service';
let { artists } = data;

@Injectable()
export class ArtistService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,
    
        private readonly trackService: TrackService,
    
        private readonly albumService: AlbumService,
      ) {}

    getAll(): CreateArtistDto[] {
        return artists;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededArtists: CreateArtistDto[] = artists.filter(artist => artist.id === id); 
        if(neededArtists.length) return neededArtists[0]; 
        return null;
    }

    create(artistDto: CreateArtistDto) {
        const artist = {...artistDto, id: uuidv4()};
        if((typeof artistDto.name !== 'string') || (typeof artistDto.grammy !== 'boolean')
            ) return -1; 
         
        artists.push(artist);
        return artist;
    }

    update(artistDto: UpdateArtistDto, id: string) {
        if(
            !validate(id)
            || (typeof artistDto.name !== 'string') 
            || (typeof artistDto.grammy !== 'boolean')
            ) return -1; 

        const changedArtists: CreateArtistDto[] = artists.filter(artist => artist.id === id); 
        if(changedArtists.length) {
            let changedArtist = changedArtists[0];
            changedArtist = {...changedArtist, ...artistDto};
            return changedArtist;
        };
        return null;
    }

    async delete(id: string) {
        if(!validate(id)) return -1;   
        const length = artists.length;    
        artists = artists.filter(artist => artist.id !== id); 
        if(artists.length === length) return null; 
        await this.favoritesService.deleteArtistFromFavorites(id);
        this.albumService.deleteArtistFromAlbums(id);
        this.trackService.deleteArtistFromTracks(id);

        return 'deleted';
    }
}