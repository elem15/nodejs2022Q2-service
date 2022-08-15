import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {

    constructor(private readonly trackService: TrackService) {}

    @Get()
    async getAll() { 
        return await this.trackService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        const result = await this.trackService.getById(id);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() CreateTrackDto: CreateTrackDto) {
       const result = await this.trackService.create(CreateTrackDto);  
       if(result) return result;       
    }

    @Put(':id')
    async update(@Body()UpdateTrackDto: UpdateTrackDto, @Param('id') id: string) {
        const result = await this.trackService.update(UpdateTrackDto, id);
        if(result) return result;
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        const result: string | number = await this.trackService.delete(id);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
    }
}