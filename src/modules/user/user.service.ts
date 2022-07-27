import { Injectable, HttpCode, HttpStatus, HttpException } from "@nestjs/common"
// import { CreateUserDto } from "./dto/create-user.dto";
import { SafeUserDto } from "./dto/safe-user.dto";
import { UserDto } from "./dto/user.dto";
import { v4 as uuidv4, validate } from 'uuid';
import { UpdatePasswordDto } from "./dto/update-password.dto";
// import data from '../../data';
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    // private users: UserDto[] = data.users

    createSafeUser(user: UserDto): SafeUserDto {
        const safeUser = JSON.parse(JSON.stringify(user));
        delete safeUser.password;
        return safeUser;
    }

    async getAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return await users.map((user) => user.toResponse());
        // const publicUsers = this.users.map(user => this.createSafeUser(user));
        // return publicUsers;
    }

    async getById(id: string): Promise<SafeUserDto | number> {
        if (!validate(id)) return 400;
        const user = await this.userRepository.findOne({ where: {id}});
        if (user) return user.toResponse();
        // const neededUsers: UserDto[] = this.users.filter(user => user.id === id);
        // if (neededUsers.length) return this.createSafeUser(neededUsers[0]);
        return 404;
    }

    async create(userDto: UserDto) {
        if ((typeof userDto.login !== 'string') || (typeof userDto.password !== 'string')
        ) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const date = Date.now();
        const user = { ...userDto, id: uuidv4(), 
            version: 1, createdat: date, updatedat: date 
        };
        const createdUser = await this.userRepository.create(user);
        return (await this.userRepository.save(createdUser)).toResponse();
    }
    // create(createUserDto: CreateUserDto): SafeUserDto | number {
    //     if ((typeof createUserDto.login !== 'string') || (typeof createUserDto.password !== 'string')
    //     ) return 400;
    //     const date = Date.now();
    //     const user = { ...createUserDto, id: uuidv4(), version: 1, createdat: date, updatedat: date };

    //     this.users.push(user);
    //     return this.createSafeUser(user);
    // }

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
        // const changedUsers: UserDto[] = this.users.filter(user => user.id === id);
        // if (changedUsers.length) {
        //     let changedUser = changedUsers[0];
        //     if (changedUser.password !== updatePasswordDto.oldPassword) return 403;
        //     changedUser = {
        //         ...changedUser, password: updatePasswordDto.newPassword,
        //         version: changedUser.version += 1, updatedat: Date.now()
        //     };
        //     changedUsers[0].password = updatePasswordDto.newPassword;
        //     return this.createSafeUser(changedUser);
        // };
        return 404;
    }

    async delete(id: string) {
        if (!validate(id)) return 400;
        const result = await this.userRepository.delete(id);
        if(result.affected === 0) return 404;
        // const length = this.users.length;
        // this.users = this.users.filter(user => user.id !== id);
        // if (this.users.length === length) return 404;
        return 'deleted';
    }
}