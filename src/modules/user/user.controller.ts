import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { SafeUserDto } from './dto/safe-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<UserDto[]> { 
        return await this.userService.getAll();
    }
 
    @Get(':id')
    async getById(@Param('id') id: string): Promise<SafeUserDto | number> {
        const result: SafeUserDto | number = await this.userService.getById(id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
       const result = this.userService.create(createUserDto);  
       if(result) return result;       
    //    else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    @Put(':id')
    async update(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id: string): Promise<SafeUserDto | number> {
        const result = await this.userService.update(updatePasswordDto, id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 403) throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;        
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        const result: string | number = await this.userService.delete(id);
        if (result === 400) throw new HttpException('Bad Request, UUID incorrect', HttpStatus.BAD_REQUEST);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;
    }
}
