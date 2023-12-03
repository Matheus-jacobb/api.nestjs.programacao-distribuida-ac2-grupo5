import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assento } from 'src/types/assento.entity';
import { VooModule } from 'src/voo-module/voo.module';
import { AssentoController } from './assento.controller';
import { AssentoService } from './assento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assento]), VooModule],
  controllers: [AssentoController],
  providers: [AssentoService],
  exports: [AssentoService],
})
export class AssentoModule {}
