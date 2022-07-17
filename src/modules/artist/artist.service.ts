import { Injectable, HttpCode, HttpStatus } from "@nestjs/common"
import { CreateArtistDto } from "./dto/create-artist.dto";
import {v4 as uuidv4, validate} from 'uuid';
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistService {
    private artists: CreateArtistDto[] = []

    getAll() {
        return this.artists;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededArtists: CreateArtistDto[] = this.artists.filter(artist => artist.id === id); 
        if(neededArtists.length) return neededArtists[0]; 
        return null;
    }

    create(artistDto: CreateArtistDto) {
        const artist = {...artistDto, id: uuidv4()};
        if((typeof artistDto.name !== 'string') || (typeof artistDto.grammy !== 'boolean')
            ) return -1; 
         
        this.artists.push(artist);
        return artist;
    }

    update(artistDto: UpdateArtistDto, id: string) {
        if(
            !validate(id)
            || (typeof artistDto.name !== 'string') 
            || (typeof artistDto.grammy !== 'boolean')
            ) return -1; 

        const changedArtists: CreateArtistDto[] = this.artists.filter(artist => artist.id === id); 
        if(changedArtists.length) {
            let changedArtist = changedArtists[0];
            changedArtist = {...changedArtist, ...artistDto};
            return changedArtist;
        };
        return null;
    }

    delete(id: string) {
        if(!validate(id)) return -1;   
        const length = this.artists.length;    
        this.artists = this.artists.filter(artist => artist.id !== id); 
        if(this.artists.length === length) return null; 
        return 'deleted';
    }
}