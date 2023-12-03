import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketEntity } from './entities/ticket.entity';
import { AuthTokenModule } from '../auth/auth-token.module';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';

@Module({
  controllers: [
    TicketController,
  ],
  providers: [
    TicketService,
  ],
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      TicketEntity,
    ]),
  ],
  exports: [
    TicketService,
  ],
})
export class TicketsModule { }
