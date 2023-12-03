import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssentoModule } from 'src/assento-module/assento.module';
import { Reserva } from 'src/types/reserva.entity';
import { VooModule } from 'src/voo-module/voo.module';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), VooModule, AssentoModule],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
