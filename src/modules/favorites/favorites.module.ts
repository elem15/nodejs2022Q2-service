import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service'; 
import { TrackService } from '../track/track.service'; 
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
})
export class FavoritesModule {}