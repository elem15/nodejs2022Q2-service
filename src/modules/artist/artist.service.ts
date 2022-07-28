import {
    BadRequestException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from "./dto/create-artist.dto";
import { v4 as uuidv4, validate } from 'uuid';
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,
        @Inject(forwardRef(() => TrackService))
        private readonly trackService: TrackService,
        @Inject(forwardRef(() => AlbumService))
        private readonly albumService: AlbumService,
        @InjectRepository(ArtistEntity)
        private artistRepository: Repository<ArtistEntity>
    ) { }

    async getAll() {
        const artists = await this.artistRepository.find();
        return await artists.map((artist) => artist.toResponse());
    }

    async getById(id: string) {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const artist = await this.artistRepository.findOne({ where: { id } });
        if (artist) return artist.toResponse();
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    async create(artistDto: CreateArtistDto) {
        if ((typeof artistDto.name !== 'string') || (typeof artistDto.grammy !== 'boolean')
        ) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const artist = { ...artistDto, id: uuidv4() };
        const createdArtist = await this.artistRepository.create(artist);
        return (await this.artistRepository.save(createdArtist)).toResponse();
    }

    async update(artistDto: UpdateArtistDto, id: string) {
        if (
            !validate(id)
            || (typeof artistDto.name !== 'string')
            || (typeof artistDto.grammy !== 'boolean')
        ) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        
        const artist = await this.artistRepository.findOne({ where: { id } });

        if (artist) {            
            const changedArtist = { ...artist, ...artistDto };
            await this.artistRepository.save(changedArtist);
            return (await this.artistRepository.findOne({ where: { id } })).toResponse();
        } 
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    async delete(id: string) {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const result = await this.artistRepository.delete(id);
        if(result.affected === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND);  
        await this.favoritesService.deleteArtistFromFavorites(id);
        await this.albumService.deleteArtistFromAlbums(id);
        await this.trackService.deleteArtistFromTracks(id);
        return 'deleted';
    }
}