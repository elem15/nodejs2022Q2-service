import { Injectable, HttpStatus, HttpException } from "@nestjs/common"
import { SafeUserDto } from "./dto/safe-user.dto";
import { UserDto } from "./dto/user.dto";
import { v4 as uuidv4, validate } from 'uuid';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    createSafeUser(user: UserDto): SafeUserDto {
        const safeUser = JSON.parse(JSON.stringify(user));
        delete safeUser.password;
        return safeUser;
    }   

    async getAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return await users.map((user) => user.toResponse());
    }

    async getById(id: string): Promise<SafeUserDto | number> {
        if (!validate(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const user = await this.userRepository.findOne({ where: {id}});
        if (user) return user.toResponse();
        return 404;
    }

    async create(userDto: UserDto) {
        if ((typeof userDto.login !== 'string') || (typeof userDto.password !== 'string')
        ) throw new HttpException('Incorrect input', HttpStatus.BAD_REQUEST);
        const date = Date.now();
        const password = crypto.createHash('md5').update(userDto.password).digest('hex');
        const user = { ...userDto, id: uuidv4(), password,
            version: 1, createdat: date, updatedat: date 
        };
        const createdUser = await this.userRepository.create(user);
        await this.userRepository.save(createdUser);
        return 'User was successfully created!'
    }

    async login(userDto: UserDto) {
        if ((typeof userDto.login !== 'string') || (typeof userDto.password !== 'string')
        ) throw new HttpException('Incorrect input', HttpStatus.BAD_REQUEST);
        const password = crypto.createHash('md5').update(userDto.password).digest('hex');
        const user = await this.userRepository.findOne({ where: {login: userDto.login}});
        if (user && password === user.password) return 'JWT';
        throw new HttpException('Login or password are incorrect', HttpStatus.FORBIDDEN);
    }

    async update(updatePasswordDto: UpdatePasswordDto, id: string): Promise<SafeUserDto | number> {
        if (
            !validate(id)
            || (typeof updatePasswordDto.oldPassword !== 'string')
            || (typeof updatePasswordDto.newPassword !== 'string')
        ) return 400;
        const user = await this.userRepository.findOne({ where: {id}});
        if (user) {
            if (user.password !== updatePasswordDto.oldPassword) return 403;
            const changedUser = {
                        ...user, password: updatePasswordDto.newPassword,
                        version: user.version += 1, updatedat: Date.now()
                    };
            await this.userRepository.save(changedUser);
            const resultedUser = await this.userRepository.findOne({ where: {id}});
            return resultedUser.toResponse();
        }
        return 404;
    }

    async delete(id: string) {
        if (!validate(id)) return 400;
        const result = await this.userRepository.delete(id);
        if(result.affected === 0) return 404;
        return 'deleted';
    }
}