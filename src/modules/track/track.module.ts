import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumService } from "../album/album.service";
import { AlbumEntity } from "../album/entities/album.entity";
import { ArtistService } from "../artist/artist.service";
import { ArtistEntity } from "../artist/entities/artist.entity";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity]), TypeOrmModule.forFeature([ArtistEntity])],
    providers: [TrackService, AlbumService, ArtistService, FavoritesService],
    controllers: [TrackController],
})
export class TrackModule {}
