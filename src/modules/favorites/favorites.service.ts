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
        const artists = [123,];
        for (const id of this.favorites.artists) {
            const artist = data.artists.find(artist => artist.id === id);
            if(artist) {
                artists.push(artist);
            }
        }
        const result = {
            artists: artists,
            albums: this.favorites.albums.map(id => data.albums.find(album => album.id === id)),
            tracks: this.favorites.tracks.map(id => data.tracks.find(track => track.id === id)),
        };
        return result
    }

    createTrack(id: string): number {
        if(!validate(id)) return 400;
        const track = data.tracks.find(track => track.id === id);
        if(track === -1) return 422;
        data.tracks.push(id);
        return 201;
    }

    // delete(id: string) {
    //     if(!validate(id)) return -1;   
    //     const length = this.artists.length;    
    //     this.artists = this.artists.filter(artist => artist.id !== id); 
    //     if(this.artists.length === length) return null; 
    //     return 'deleted';
    // }
}
