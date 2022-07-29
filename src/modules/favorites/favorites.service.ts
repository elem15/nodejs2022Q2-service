import {
    BadRequestException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { FavoritesRequestDto } from './dto/favorites-request.dto';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumIdEntity, ArtistIdEntity, TrackIdEntity } from './entities/favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
    constructor(
        @Inject(forwardRef(() => AlbumService))
        private readonly albumService: AlbumService,
        @Inject(forwardRef(() => TrackService))
        private readonly trackService: TrackService,
        @Inject(forwardRef(() => ArtistService))
        private readonly artistService: ArtistService,
        @InjectRepository(AlbumIdEntity)
        private albumIdEntityRepository: Repository<AlbumIdEntity>,
        @InjectRepository(ArtistIdEntity)
        private artistIdEntityRepository: Repository<ArtistIdEntity>,
        @InjectRepository(TrackIdEntity)
        private trackIdEntityRepository: Repository<TrackIdEntity>,
    ) {}

    async getAll(): Promise<FavoritesResponseDto> {    
        const trackIds = await this.trackIdEntityRepository.find();
        const tracks = await Promise.all(
            trackIds.map(async ({ id }) => await this.trackService.getById(id))
        );
        const albumsIds = await this.albumIdEntityRepository.find();
        const albums = await Promise.all(
            albumsIds.map(async ({ id }) => await this.albumService.getById(id))
        );
        const artistsIds = await this.artistIdEntityRepository.find();
        const artists = await Promise.all(
            artistsIds.map(async ({ id }) => await this.artistService.getById(id))
        );      
        return { albums, artists, tracks };
    }
    async addTrackToFavorites(id: string) {        
        const track = await this.trackService.getById(id);
        if(!track) throw new HttpException('The track does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        const createdTrackId = await this.trackIdEntityRepository.create({ id });
        await this.trackIdEntityRepository.save(createdTrackId);
        return track;
    }
    async deleteTrackFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        await this.trackIdEntityRepository.delete(id);
    }

    async addAlbumToFavorites(id: string) {
        const album = await this.albumService.getById(id);
        if(!album) throw new UnprocessableEntityException('The album does not exist');
        const createdAlbumId = await this.albumIdEntityRepository.create({ id });
        await this.albumIdEntityRepository.save(createdAlbumId);
        return album;
    }
    async deleteAlbumFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        await this.albumIdEntityRepository.delete(id);
    }

    async addArtistToFavorites(id: string): Promise<CreateArtistDto | -1> {
        const artist = await this.artistService.getById(id);
        if(!artist) throw new UnprocessableEntityException('The artist does not exist');
        const createdArtistId = await this.artistIdEntityRepository.create({ id });
        await this.artistIdEntityRepository.save(createdArtistId);
        return artist;
    }
    async deleteArtistFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        await this.artistIdEntityRepository.delete(id);
    }
}
