import { Injectable } from "@nestjs/common"
import { CreateArtistDto } from "./dto/create-artist.dto";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ArtistService {
    private artists: CreateArtistDto[] = []

    getAll() {
        return this.artists;
    }

    getById(id: string) {
        return this.artists.find(artist => artist.id === id); 
    }

    create(artistDto: CreateArtistDto) {
        this.artists.push({...artistDto, id: uuidv4()});
    }
}