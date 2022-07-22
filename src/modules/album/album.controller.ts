import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    getAll(): CreateAlbumDto[] { 
        return this.albumService.getAll();
    }  

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: string): CreateAlbumDto | number {
        const result: CreateAlbumDto | number = this.albumService.getById(id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreateAlbumDto: CreateAlbumDto) {
       const result: CreateAlbumDto | number = this.albumService.create(CreateAlbumDto);  
       if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
       if(result) return result;       
    }

    @Put(':id')
    update(@Body() UpdateAlbumDto: UpdateAlbumDto, @Param('id') id: string) {
        const result: CreateAlbumDto | number =  this.albumService.update(UpdateAlbumDto, id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<string | number> {
        const result = await this.albumService.delete(id);
        if (await result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return await result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
    }
}
