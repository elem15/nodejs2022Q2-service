import { Injectable } from '@nestjs/common';
import {v4 as uuidv4, validate} from 'uuid';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { FavoritesRequestDto } from './dto/favorites-request.dto';
import data from '../../data';

@Injectable()
export class FavoritesService {

    private favorites: FavoritesRequestDto = {
        albums: [],
        artists: [],
        tracks: [],
    }

    getAll(): FavoritesResponseDto {
        return {
            artists: this.favorites.artists.map(id => data.artists.find(artist => artist.id === id)),
            albums: this.favorites.albums.map(id => data.albums.find(album => album.id === id)),
            tracks: this.favorites.tracks.map(id => data.tracks.find(track => track.id === id)),
        } ;
    }

    // create(artistDto: CreateArtistDto) {
    //     const artist = {...artistDto, id: uuidv4()};
    //     if((typeof artistDto.name !== 'string') || (typeof artistDto.grammy !== 'boolean')
    //         ) return -1; 
         
    //     this.artists.push(artist);
    //     return artist;
    // }

    // delete(id: string) {
    //     if(!validate(id)) return -1;   
    //     const length = this.artists.length;    
    //     this.artists = this.artists.filter(artist => artist.id !== id); 
    //     if(this.artists.length === length) return null; 
    //     return 'deleted';
    // }
}
