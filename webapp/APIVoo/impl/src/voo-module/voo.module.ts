import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voo } from 'src/types/voo.entity';
import { VooController } from './voo.controller';
import { VooService } from './voo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voo])],
  controllers: [VooController],
  providers: [VooService],
  exports: [VooService],
})
export class VooModule {}
