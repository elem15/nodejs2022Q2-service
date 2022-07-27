import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistService } from "../artist/artist.service";
import { ArtistEntity } from "../artist/entities/artist.entity";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackService } from "../track/track.service";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumEntity } from "./entities/album.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity]), TypeOrmModule.forFeature([ArtistEntity])],
    providers: [AlbumService, TrackService, ArtistService, FavoritesService],
    controllers: [AlbumController,],
})
export class AlbumModule {}
