import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    version?: number;

    @Column()
    createdat?: number;

    @Column()
    updatedat?: number;

    toResponse() {
        const { id, login, version, createdat, updatedat } = this;
        return { id, login, version, createdat, updatedat };
    }
}