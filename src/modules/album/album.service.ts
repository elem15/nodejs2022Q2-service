import { Injectable, HttpCode, HttpStatus, forwardRef, Inject } from "@nestjs/common"
import { CreateAlbumDto } from "./dto/create-album.dto";
import {v4 as uuidv4, validate} from 'uuid';
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackService } from "../track/track.service";
import data from '../../data';
let { albums } = data;

@Injectable()
export class AlbumService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,    
        private readonly trackService: TrackService,
      ) {}

    getAll() {
        return albums;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededAlbums: CreateAlbumDto[] = albums.filter(album => album.id === id); 
        if(neededAlbums.length) return neededAlbums[0]; 
        return null;
    }

    create(albumDto: CreateAlbumDto) {
        const album = {...albumDto, id: uuidv4()};
        if((typeof albumDto.name !== 'string') || (typeof albumDto.year !== 'number')
            ) return -1; 
         
        albums.push(album);
        return album;
    }

    update(albumDto: UpdateAlbumDto, id: string) {
        if(
            !validate(id)
            || (typeof albumDto.name !== 'string') 
            || (typeof albumDto.year !== 'number')
            ) return -1; 

        const changedAlbums: CreateAlbumDto[] = albums.filter(album => album.id === id); 
        if(changedAlbums.length) {
            let changedAlbum= changedAlbums[0];
            changedAlbum= {...changedAlbum, ...albumDto};
            return changedAlbum
        };
        return null;
    }

    async delete(id: string): Promise<number | string> {
        if(!validate(id)) return -1;   
        const length = albums.length;    
        albums = albums.filter(album => album.id !== id); 
        if(albums.length === length) return null; 
        await this.favoritesService.deleteAlbumFromFavorites(id);
        await this.trackService.deleteAlbumFromTracks(id);
        return 'deleted';
    }

    deleteArtistFromAlbums(id: string) {
        for (const album of albums)
          if (album.artistId === id) album.artistId = null;
      }
}