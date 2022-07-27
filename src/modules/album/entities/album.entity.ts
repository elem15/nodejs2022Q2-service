import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    year: number;

    @Column()
    artistid: string;

    toResponse() {
        const { id, name, year, artistid } = this;
        return { id, name, year, artistId: artistid };
    }
}