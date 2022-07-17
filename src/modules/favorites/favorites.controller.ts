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
 
    @Post('artist/:id')
    @HttpCode(HttpStatus.CREATED)
    create(@Param('id') id: string) {
       const result: number = this.favoritesService.createTrack(id);  
       if (result === 201) return 'Favorite track was added';
       if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
       if (result === 422) throw new HttpException("Track doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    
    // @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // delete(@Param('id') id: string) {
    //     const result: string | number =  this.artistService.delete(id);
    //     if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //     if(result) return result;
    //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
    // }

}
