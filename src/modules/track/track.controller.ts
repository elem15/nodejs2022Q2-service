import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {

    constructor(private readonly trackService: TrackService) {}

    @Get()
    getAll(): CreateTrackDto[] { 
        return this.trackService.getAll();
    }
    // @Get()
    // getAll(@Req() req: Request, @Res() res: Response): string {
    //     res.status(200).end('Bay');
    //     return 'getAll';
    // }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: string): CreateTrackDto | number {
        const result: CreateTrackDto | number = this.trackService.getById(id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // @Header('Cache-Control', 'none')
    create(@Body() CreateTrackDto: CreateTrackDto) {
       const result: CreateTrackDto | number = this.trackService.create(CreateTrackDto);  
       if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
       if(result) return result;       
    }

    @Put(':id')
    update(@Body()UpdateTrackDto: UpdateTrackDto, @Param('id') id: string) {
        const result: CreateTrackDto | number =  this.trackService.update(UpdateTrackDto, id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        const result: string | number =  this.trackService.delete(id);
        if (result === -1) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if(result) return result;
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);    
    }
}