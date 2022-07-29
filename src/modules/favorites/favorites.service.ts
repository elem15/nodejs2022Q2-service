import {
    BadRequestException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
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
import data from '../../data';
const { albums, tracks, artists, favorites } = data;

@Injectable()
export class FavoritesService {
    constructor(
        @Inject(forwardRef(() => AlbumService))
        private readonly albumService: AlbumService,
        @Inject(forwardRef(() => TrackService))
        private readonly trackService: TrackService,
        @Inject(forwardRef(() => ArtistService))
        private readonly artistService: ArtistService,
    ) {}

    async getAll(): Promise<FavoritesResponseDto> {
        const tracks = await Promise.all(
            favorites.tracks.map(async (i) => await this.trackService.getById(i)),
        );
        const albums = await Promise.all(
            favorites.albums.map(async (i) => await this.albumService.getById(i)),
        );
        const artists = await Promise.all(
            favorites.artists.map(async (i) => await this.artistService.getById(i)),
        );
        return { albums, artists, tracks };
    }
    async addTrackToFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        // if (tracks.findIndex((i) => i.id === id) === -1)
        //     throw new UnprocessableEntityException();
        const track = await this.trackService.getById(id);
        if(!track) throw new HttpException('The track does not exist', HttpStatus.UNPROCESSABLE_ENTITY);

        favorites.tracks.push(id);
        return track;
    }
    deleteTrackFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        const idx = favorites.tracks.findIndex((i) => i == id);
        // if (idx === -1) throw new NotFoundException();
        if (idx !== -1) favorites.tracks.splice(idx, 1);
    }

    async addAlbumToFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        // if (albums.findIndex((i) => i.id === id) === -1)
        //     throw new UnprocessableEntityException();
        const album = await this.albumService.getById(id);
        if(!album) throw new HttpException('The album does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        favorites.albums.push(id);
        return album;
    }
    deleteAlbumFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        const idx = favorites.albums.findIndex((i) => i == id);
        // if (idx === -1) throw new NotFoundException();
        if (idx !== -1) favorites.albums.splice(idx, 1);
    }

    async addArtistToFavorites(id: string): Promise<CreateArtistDto | -1> {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        // if (artists.findIndex((i) => i.id === id) === -1)
        const artist = await this.artistService.getById(id);
        if(!artist) throw new HttpException('The artist does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        // if(artist.id !== id) throw new UnprocessableEntityException();
        favorites.artists.push(id);
        // const artistsEmpty = artists.filter(artist => artist.id !== id); 
        // if(artistsEmpty.length === artists.length) throw new UnprocessableEntityException();
        return artist;
    }
    async deleteArtistFromFavorites(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid UUID');
        const idx = favorites.artists.findIndex((i) => i == id);
        // if (idx === -1) throw new NotFoundException();
        // if (idx !== -1) 
        await favorites.artists.splice(idx, 1);
        // else throw new NotFoundException();
    }
}
