import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import {v4 as uuidv4, validate} from 'uuid';
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import data from '../../data';
import { FavoritesService } from '../favorites/favorites.service';
let { tracks } = data;

@Injectable()
export class TrackService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,
      ) {}

    getAll() {
        return tracks;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededTracks: CreateTrackDto[] = tracks.filter(track => track.id === id); 
        if(neededTracks.length) return neededTracks[0]; 
        return null;
    }

    create(trackDto: CreateTrackDto) {
        const track = {...trackDto, id: uuidv4()};
        if((typeof trackDto.name !== 'string') || (typeof trackDto.duration !== 'number')
            ) return -1;          
        tracks.push(track);
        return track;
    }

    update(trackDto: UpdateTrackDto, id: string) {
        if(
            !validate(id)
            || (typeof trackDto.name !== 'string') 
            || (typeof trackDto.duration !== 'number')
            ) return -1; 

        const changedTracks: CreateTrackDto[] = tracks.filter(track => track.id === id); 
        if(changedTracks.length) {
            let changedTrack = changedTracks[0];
            changedTrack = {...changedTrack, ...trackDto};
            return changedTrack;
        };
        return null;
    }

    async delete(id: string) {
        if(!validate(id)) return -1;   
        const length = tracks.length;    
        tracks = tracks.filter(track => track.id !== id); 
        if(tracks.length === length) return null; 
        await this.favoritesService.deleteTrackFromFavorites(id);
        return 'deleted';
    }

    deleteArtistFromTracks(id: string) {
        for (const track of tracks)
            if (track.artistId === id) track.artistId = null;
    }

    deleteAlbumFromTracks(id: string) {
        for (const track of tracks)
            if (track.albumId === id) track.albumId = null;
    }
}