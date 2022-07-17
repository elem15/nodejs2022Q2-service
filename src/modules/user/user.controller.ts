import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { SafeUserDto } from './dto/safe-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll(): SafeUserDto[] { 
        return this.userService.getAll();
    }
 
    @Get(':id')
    getById(@Param('id') id: string): SafeUserDto | number {
        const result: SafeUserDto | number = this.userService.getById(id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): SafeUserDto | number {
       const result: SafeUserDto | number = this.userService.create(createUserDto);  
       if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
       if(result) return result;       
    }

    @Put(':id')
    update(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id: string): SafeUserDto | number {
        const result: SafeUserDto | number =  this.userService.update(updatePasswordDto, id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 403) throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;        
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        const result: string | number =  this.userService.delete(id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;
    }
}
