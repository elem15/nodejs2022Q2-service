import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Request, Response } from 'express';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {

    constructor(private readonly artistService: ArtistService) {

    }

    @Get()
    getAll(): CreateArtistDto[] { 
        return this.artistService.getAll();
    }
    // @Get()
    // getAll(@Req() req: Request, @Res() res: Response): string {
    //     res.status(200).end('Bay');
    //     return 'getAll';
    // }

    @Get(':id')
    getById(@Param('id') id: string): CreateArtistDto {
        return this.artistService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // @Header('Cache-Control', 'none')
    create(@Body() CreateArtistDto: CreateArtistDto) {
        this.artistService.create(CreateArtistDto);
        return `name = ${CreateArtistDto.name} grammy = ${CreateArtistDto.grammy} created`; 
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