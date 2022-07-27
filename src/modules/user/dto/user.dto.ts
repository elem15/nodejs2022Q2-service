import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
    id?: string;  

    @ApiProperty({ example: 'test', description: 'Unique login of the user'})
    @IsNotEmpty({ message: 'The user login cannot be empty'})
    @IsString({ message: 'The user login must be string'})
    login: string; 

    @ApiProperty({ example: '123P', description: 'Password of the user'})
    @IsNotEmpty({ message: 'The user password cannot be empty'})
    @IsString({ message: 'The user password must be string'})
    password?: string;

    version?: number;
    createdat?: number;
    updatedat?: number;
  }