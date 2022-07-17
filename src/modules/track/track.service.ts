import { Injectable, HttpCode, HttpStatus } from "@nestjs/common"
import { CreateTrackDto } from "./dto/create-track.dto";
import {v4 as uuidv4, validate} from 'uuid';
import { UpdateTrackDto } from "./dto/update-track.dto";
import data from '../../data'

@Injectable()
export class TrackService {
    private tracks: CreateTrackDto[] = data.tracks

    getAll() {
        return this.tracks;
    }

    getById(id: string) {
        if(!validate(id)) return -1;       
        const neededTracks: CreateTrackDto[] = this.tracks.filter(track => track.id === id); 
        if(neededTracks.length) return neededTracks[0]; 
        return null;
    }

    create(trackDto: CreateTrackDto) {
        const track = {...trackDto, id: uuidv4()};
        if((typeof trackDto.name !== 'string') || (typeof trackDto.duration !== 'number')
            ) return -1;          
        this.tracks.push(track);
        return track;
    }

    update(trackDto: UpdateTrackDto, id: string) {
        if(
            !validate(id)
            || (typeof trackDto.name !== 'string') 
            || (typeof trackDto.duration !== 'number')
            ) return -1; 

        const changedTracks: CreateTrackDto[] = this.tracks.filter(track => track.id === id); 
        if(changedTracks.length) {
            let changedTrack = changedTracks[0];
            changedTrack = {...changedTrack, ...trackDto};
            return changedTrack;
        };
        return null;
    }

    delete(id: string) {
        if(!validate(id)) return -1;   
        const length = this.tracks.length;    
        this.tracks = this.tracks.filter(track => track.id !== id); 
        if(this.tracks.length === length) return null; 
        return 'deleted';
    }
}