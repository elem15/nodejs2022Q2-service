import { Module } from "@nestjs/common";
import { AlbumService } from "../album/album.service";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackService } from "../track/track.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
    providers: [ArtistService, AlbumService, TrackService, FavoritesService],
    controllers: [ArtistController],
})
export class ArtistModule {}
