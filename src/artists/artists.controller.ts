import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
    @Get()
    getAll(): string {
        return 'getAll';
    }

    @Get(':id')
    getById(@Param('id') id: string): string {
        return 'getById ' + id;
    }

    @Post('')
    create(@Param('name') param) {
        return 'create ' + param.name; 
    }
}
