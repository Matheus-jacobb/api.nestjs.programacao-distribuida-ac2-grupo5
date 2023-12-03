import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventEntity } from './entities/event.entity';
import { AuthTokenModule } from '../auth/auth-token.module';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';

@Module({
  controllers: [
    EventController,
  ],
  providers: [
    EventService,
  ],
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      EventEntity,
    ]),
  ],
  exports: [
    EventService,
  ],
})
export class EventModule { }
