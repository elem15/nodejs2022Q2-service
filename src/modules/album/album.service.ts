import { Injectable, HttpCode, HttpException, HttpStatus, forwardRef, Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackService } from "../track/track.service";
import data from '../../data';
import { AlbumEntity } from "./entities/album.entity";
import { ArtistService } from "../artist/artist.service";
let { albums } = data;

@Injectable()
export class AlbumService {
    constructor(
        @Inject(forwardRef(() => FavoritesService))
        private readonly favoritesService: FavoritesService,
        @Inject(forwardRef(() => TrackService))
        private readonly trackService: TrackService,
        @Inject(forwardRef(() => ArtistService))
        private readonly artistService: ArtistService,
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>
    ) { }

    async getAll(): Promise<CreateAlbumDto[]> {
        const albums = await this.albumRepository.find();
        return await albums.map((album) => album.toResponse());
    }
    async getById(id: string): Promise<CreateAlbumDto | number> {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const album = await this.albumRepository.findOne({ where: { id } });
        if (album) return album.toResponse();
    }

    async create(albumDto: CreateAlbumDto) {
        if ((typeof albumDto.name !== 'string') || (typeof albumDto.year !== 'number')) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        };
        const album = { ...albumDto, id: uuidv4() };
        album.artistid = albumDto.artistId
        const createdAlbum = await this.albumRepository.create(album);
        return (await this.albumRepository.save(createdAlbum)).toResponse();
    }

    async update(albumDto: UpdateAlbumDto, id: string) {
        if (
            !validate(id)
            || (typeof albumDto.name !== 'string')
            || (typeof albumDto.year !== 'number')
        ) return -1;
        const album = await this.albumRepository.findOne({ where: { id } });
        if (album) {            
            const changedAlbum = { ...album, ...albumDto };
            changedAlbum.artistid = albumDto.artistId;
            await this.albumRepository.save(changedAlbum);
            return (await this.albumRepository.findOne({ where: { id } })).toResponse();
        }   
        return null;
    }

    async delete(id: string): Promise<number | string> {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const result = await this.albumRepository.delete(id);
        if(result.affected === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
        await this.favoritesService.deleteAlbumFromFavorites(id);
        await this.trackService.deleteAlbumFromTracks(id);
        return 'deleted';
    }

    async deleteArtistFromAlbums(artistid: string) {
        const album = await this.albumRepository.findOne({ where: { artistid } });
        if (album) {            
            const changedAlbum = { ...album, artistid: null };
            await this.albumRepository.save(changedAlbum);
        }
    } 
}