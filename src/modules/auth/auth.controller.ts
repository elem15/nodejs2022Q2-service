import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { SafeUserDto } from './dto/safe-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
       const result = this.authService.create(createUserDto);  
       if(result) return result;       
    }

    @Put(':id')
    async update(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id: string): Promise<SafeUserDto | number> {
        const result = await this.authService.update(updatePasswordDto, id);
        if (result === 400) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (result === 403) throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;        
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        const result: string | number = await this.authService.delete(id);
        if (result === 400) throw new HttpException('Bad Request, UUID incorrect', HttpStatus.BAD_REQUEST);
        if (result === 404) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(result) return result;
    }
}
