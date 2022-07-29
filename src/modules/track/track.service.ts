import {
    BadRequestException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import data from '../../data';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
let { tracks } = data;

@Injectable()
export class TrackService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,
        // @Inject(forwardRef(() => TrackService))
        // private readonly trackService: TrackService,
        // @Inject(forwardRef(() => AlbumService))
        // private readonly albumService: AlbumService,
        // @Inject(forwardRef(() => ArtistService))
        // private readonly artistService: ArtistService,
        @InjectRepository(TrackEntity)
        private trackRepository: Repository<TrackEntity>
    ) { }

    async getAll() {
        const tracks = await this.trackRepository.find();
        return await tracks.map((track) => track.toResponse());
    }

    async getById(id: string) {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const track = await this.trackRepository.findOne({ where: { id } });
        if (track) return track.toResponse();
    }

    async create(trackDto: CreateTrackDto) {
        if ((typeof trackDto.name !== 'string') || (typeof trackDto.duration !== 'number')
        ) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        trackDto.albumid = trackDto.albumId;
        trackDto.artistid = trackDto.artistId;
        const track = { ...trackDto, id: uuidv4() };
        const createdTrack = await this.trackRepository.create(track);
        return (await this.trackRepository.save(createdTrack)).toResponse();
    }

    async update(trackDto: CreateTrackDto, id: string) {
        if (
            !validate(id)
            || (typeof trackDto.name !== 'string')
            || (typeof trackDto.duration !== 'number')
        ) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

        const track = await this.trackRepository.findOne({ where: { id } });
        trackDto.albumid = trackDto.albumId;
        trackDto.artistid = trackDto.artistId;
        if (track) {            
            const changedArtist = { ...track, ...trackDto };
            await this.trackRepository.save(changedArtist);
            return (await this.trackRepository.findOne({ where: { id } })).toResponse();
        } 
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    async delete(id: string) {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const result = await this.trackRepository.delete(id);
        if(result.affected === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND);  
        await this.favoritesService.deleteTrackFromFavorites(id);
        return 'deleted';
    }

    async deleteArtistFromTracks(artistid: string) {
        const track = await this.trackRepository.findOne({ where: { artistid } });
        if (track) {            
            const changedTrack = { ...track, artistid: null };
            await this.trackRepository.save(changedTrack);
        }
    }
    async deleteAlbumFromTracks(albumid: string) {
        const track = await this.trackRepository.findOne({ where: { albumid } });
        if (track) {            
            const changedTrack = { ...track, albumid: null };
            await this.trackRepository.save(changedTrack);
        }
    }
}