import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { AssentoModule } from './assento-module/assento.module';
import { ReservaModule } from './reserva-module/reserva.module';
import { VooModule } from './voo-module/voo.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig as any),
    ReservaModule,
    VooModule,
    AssentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
