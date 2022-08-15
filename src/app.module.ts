import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../ormconfig';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ArtistModule, UserModule, TrackModule, AlbumModule, FavoritesModule, AuthModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
