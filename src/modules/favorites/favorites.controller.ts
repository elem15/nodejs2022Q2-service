import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { FavoritesRequestDto } from './dto/favorites-request.dto';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    getAll(): FavoritesResponseDto { 
        return this.favoritesService.getAll();
    }
 
    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // // @Header('Cache-Control', 'none')
    // create(@Body() CreateArtistDto: CreateArtistDto) {
    //    const result: CreateArtistDto | number = this.artistService.create(CreateArtistDto);  
    //    if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //    if(result) return result;       
    // }
    
    // @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // delete(@Param('id') id: string) {
    //     const result: string | number =  this.artistService.delete(id);
    //     if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //     if(result) return result;
    //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
    // }

}
