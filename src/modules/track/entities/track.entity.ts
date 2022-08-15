import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column()
    duration?: number;

    @Column()
    artistid?: string;

    @Column()
    albumid?: string;

    toResponse() {
        const { id, name, duration, artistid, albumid } = this;
        return { id, name, duration, artistId: artistid, albumId: albumid };
    }
}