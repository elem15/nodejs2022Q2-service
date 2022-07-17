import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

@Module({
    imports: [],
    providers: [AlbumService],
    controllers: [AlbumController],
})
export class AlbumModule {}
