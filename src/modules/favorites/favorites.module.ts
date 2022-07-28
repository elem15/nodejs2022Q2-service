import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service'; 
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { TrackService } from '../track/track.service'; 
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, TrackEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
})
export class FavoritesModule {}