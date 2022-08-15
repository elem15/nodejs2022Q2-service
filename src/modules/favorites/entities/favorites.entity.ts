import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('albumsids')
export class AlbumIdEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    toResponse() {
        const { id } = this;
        return { id };
    }
}

@Entity('artistsids')
export class ArtistIdEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    toResponse() {
        const { id } = this;
        return { id };
    }
}

@Entity('tracksids')
export class TrackIdEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    toResponse() {
        const { id } = this;
        return { id };
    }
}