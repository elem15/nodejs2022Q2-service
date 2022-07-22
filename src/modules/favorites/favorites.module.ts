import { Module } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service'; 
import { TrackService } from '../track/track.service'; 
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service'; 

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
})
export class FavoritesModule {}