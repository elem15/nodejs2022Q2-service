import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {v4 as uuidv4} from 'uuid';

@Controller('artist')
export class ArtistController {
    @Get()
    getAll(): string {
        return 'getAll';
    }

    @Get(':id')
    getById(@Param('id') id: string): string {
        return 'getById ' + id;
    }

    @Post()
    create(@Body() CreateArtistDto: CreateArtistDto) {
        return `id = ${uuidv4()} name = ${CreateArtistDto.name} grammy = ${CreateArtistDto.grammy}`; 
    }

    @Put(':id')
    update(@Body() UpdateArtistDto: UpdateArtistDto, @Param('id') id: string) {
        return `id = ${id} name = ${UpdateArtistDto.name} grammy = ${UpdateArtistDto.grammy}`; 
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'remove ' + id; 
    }
}