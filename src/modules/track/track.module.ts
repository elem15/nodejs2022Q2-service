import { Module } from "@nestjs/common";
import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";
import { FavoritesService } from "../favorites/favorites.service";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    providers: [TrackService, AlbumService, ArtistService, FavoritesService],
    controllers: [TrackController],
})
export class TrackModule {}
