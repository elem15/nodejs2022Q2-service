import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumService } from "../album/album.service";
import { AlbumEntity } from "../album/entities/album.entity";
import { AlbumIdEntity, ArtistIdEntity, TrackIdEntity } from "../favorites/entities/favorites.entity";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackEntity } from "../track/entities/track.entity";
import { TrackService } from "../track/track.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistEntity } from "./entities/artist.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, TrackEntity, AlbumIdEntity, TrackIdEntity, ArtistIdEntity])],
    providers: [ArtistService, AlbumService, TrackService, FavoritesService],
    controllers: [ArtistController],
})
export class ArtistModule {}
