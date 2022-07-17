import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Req, Res, HttpException } from '@nestjs/common';
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
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: string): CreateArtistDto | number {
        const result: CreateArtistDto | number = this.artistService.getById(id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // @Header('Cache-Control', 'none')
    create(@Body() CreateArtistDto: CreateArtistDto) {
       const result: CreateArtistDto | number = this.artistService.create(CreateArtistDto);  
       if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
       if(result) return result;       
    }

    @Put(':id')
    update(@Body() UpdateArtistDto: UpdateArtistDto, @Param('id') id: string) {
        const result: CreateArtistDto | number =  this.artistService.update(UpdateArtistDto, id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        const result: string | number =  this.artistService.delete(id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);    }
}