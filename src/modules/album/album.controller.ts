import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    async getAll(): Promise<CreateAlbumDto[]> { 
        return await this.albumService.getAll();
    }  

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        const result = await this.albumService.getById(id);
        if(result) return result;        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() CreateAlbumDto: CreateAlbumDto) {
       const result = await this.albumService.create(CreateAlbumDto);         
       if(result) return result;       
    }

    @Put(':id')
    async update(@Body() UpdateAlbumDto: UpdateAlbumDto, @Param('id') id: string) {
        const result = await this.albumService.update(UpdateAlbumDto, id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<string | number> {
        const result = await this.albumService.delete(id);
        if(result) return await result;
        
    }
}
