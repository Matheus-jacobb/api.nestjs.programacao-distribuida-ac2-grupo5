import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaceEntity } from './entities/place.entity';
import { AuthTokenModule } from '../auth/auth-token.module';
import { PlaceController } from './controllers/place.controller';
import { PlaceService } from './services/place.service';

@Module({
  controllers: [
    PlaceController,
  ],
  providers: [
    PlaceService,
  ],
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      PlaceEntity,
    ]),
  ],
  exports: [
    PlaceService,
  ],
})
export class PlaceModule { }
