import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [],
    providers: [TrackService],
    controllers: [TrackController],
})
export class TrackModule {}
