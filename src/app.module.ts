import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistController } from './artist/artist.controller';

@Module({
  imports: [],
  controllers: [AppController, ArtistsController, ArtistController],
  providers: [AppService],
})
export class AppModule {}
