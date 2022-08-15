import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {

    constructor(private readonly artistService: ArtistService) {}

    @Get()
    async getAll() { 
        return await this.artistService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        const result = await this.artistService.getById(id);        
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() CreateArtistDto: CreateArtistDto) {
       const result = this.artistService.create(CreateArtistDto);  
       if(result) return result;       
    }

    @Put(':id')
    async update(@Body() UpdateArtistDto: UpdateArtistDto, @Param('id') id: string) {
        const result = await this.artistService.update(UpdateArtistDto, id);
        if(result) return result;
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        const result: string | number = await this.artistService.delete(id);
        if(result) return result;
    }
}