import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
  } from '@nestjs/common';
  import { UpdateAlbumDto } from '../album/dto/update-album.dto';
  import { CreateArtistDto } from '../artist/dto/create-artist.dto'; 
  import { UpdateTrackDto } from '../track/dto/update-track.dto'; 
  import { FavoritesResponseDto } from './dto/favorites-response.dto'; 
  import { FavoritesService } from './favorites.service';    

  @Controller('favs')
  export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}
  
    @Get()
    getAll(): Promise<FavoritesResponseDto> {
      return this.favoritesService.getAll();
    }
  
    @Post('/track/:id')
    addTrackToFavorites(@Param('id') id) {
      return this.favoritesService.addTrackToFavorites(id);
    }
    @Delete('/track/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTrackFromFavorites(@Param('id') id) {
      await this.favoritesService.deleteTrackFromFavorites(id);
    }
    @Post('/album/:id')
    async addAlbumToFavorites(@Param('id') id) {
      return await this.favoritesService.addAlbumToFavorites(id);
    }
    @Delete('/album/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAlbumFromFavorites(@Param('id') id) {
      await this.favoritesService.deleteAlbumFromFavorites(id);
    }
    @Post('/artist/:id')
    addArtistToFavorites(@Param('id') id): Promise<CreateArtistDto | -1> {
      return this.favoritesService.addArtistToFavorites(id);
    }
    @Delete('/artist/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteArtistFromFavorites(@Param('id') id) {
      await this.favoritesService.deleteArtistFromFavorites(id);
    }
  }
  