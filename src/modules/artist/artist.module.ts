import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumService } from "../album/album.service";
import { AlbumEntity } from "../album/entities/album.entity";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackService } from "../track/track.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity])],
    providers: [ArtistService, AlbumService, TrackService, FavoritesService],
    controllers: [ArtistController],
})
export class ArtistModule {}
