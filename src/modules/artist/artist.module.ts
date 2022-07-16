import { Module } from "@nestjs/common";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
    imports: [],
    providers: [ArtistService],
    controllers: [ArtistController],
})
export class ArtistModule {}
