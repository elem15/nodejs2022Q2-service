import { Injectable, HttpCode, HttpStatus } from "@nestjs/common"
import { CreateAlbumDto } from "./dto/create-album.dto";
import {v4 as uuidv4, validate} from 'uuid';
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumService {
    private albums: CreateAlbumDto[] = []

    getAll() {
        return this.albums;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededAlbums: CreateAlbumDto[] = this.albums.filter(album => album.id === id); 
        if(neededAlbums.length) return neededAlbums[0]; 
        return null;
    }

    create(albumDto: CreateAlbumDto) {
        const album = {...albumDto, id: uuidv4()};
        if((typeof albumDto.name !== 'string') || (typeof albumDto.year !== 'number')
            ) return -1; 
         
        this.albums.push(album);
        return album;
    }

    update(albumDto: UpdateAlbumDto, id: string) {
        if(
            !validate(id)
            || (typeof albumDto.name !== 'string') 
            || (typeof albumDto.year !== 'number')
            ) return -1; 

        const changedAlbums: CreateAlbumDto[] = this.albums.filter(album => album.id === id); 
        if(changedAlbums.length) {
            let changedAlbum= changedAlbums[0];
            changedAlbum= {...changedAlbum, ...albumDto};
            return changedAlbum
        };
        return null;
    }

    delete(id: string) {
        if(!validate(id)) return -1;   
        const length = this.albums.length;    
        this.albums = this.albums.filter(album => album.id !== id); 
        if(this.albums.length === length) return null; 
        return 'deleted';
    }
}