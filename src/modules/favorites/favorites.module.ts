import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
    imports: [],
    providers: [FavoritesService],
    controllers: [FavoritesController],
})
export class FavoritesModule {}
