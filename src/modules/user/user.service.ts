import { Injectable, HttpCode, HttpStatus } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto";
import { SafeUserDto } from "./dto/safe-user.dto";
import { UserDto } from "./dto/user.dto";
import { v4 as uuidv4, validate } from 'uuid';
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class UserService {
    private users: UserDto[] = []

    createSafeUser(user: UserDto): SafeUserDto {
        const safeUser = JSON.parse(JSON.stringify(user));
        delete safeUser.password;
        return safeUser;
    }

    getAll(): SafeUserDto[] {
        const publicUsers = this.users.map(user => this.createSafeUser(user));
        return publicUsers;
    }

    getById(id: string): SafeUserDto | number {
        if (!validate(id)) return 400;
        const neededUsers: UserDto[] = this.users.filter(user => user.id === id);
        if (neededUsers.length) return this.createSafeUser(neededUsers[0]);
        return 404;
    }

    create(createUserDto: CreateUserDto): SafeUserDto | number {
        if ((typeof createUserDto.login !== 'string') || (typeof createUserDto.password !== 'string')
        ) return 400;
        const date = Date.now();
        const user = { ...createUserDto, id: uuidv4(), version: 1, createdAt: date, updatedAt: date };

        this.users.push(user);
        return this.createSafeUser(user);
    }

    update(updatePasswordDto: UpdatePasswordDto, id: string): SafeUserDto | number {
        if (
            !validate(id)
            || (typeof updatePasswordDto.oldPassword !== 'string')
            || (typeof updatePasswordDto.newPassword !== 'string')
        ) return 400;

        const changedUsers: UserDto[] = this.users.filter(user => user.id === id);
        if (changedUsers.length) {
            let changedUser = changedUsers[0];
            if (changedUser.password !== updatePasswordDto.oldPassword) return 403;
            changedUser = {
                ...changedUser, password: updatePasswordDto.newPassword,
                version: changedUser.version += 1, updatedAt: Date.now()
            };
            changedUsers[0].password = updatePasswordDto.newPassword;
            return this.createSafeUser(changedUser);
        };
        return 404;
    }

    delete(id: string) {
        if (!validate(id)) return 400;
        const length = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        if (this.users.length === length) return 404;
        return 'deleted';
    }
}