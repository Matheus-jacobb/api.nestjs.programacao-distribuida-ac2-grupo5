import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { TurismoService } from './services/turismo.service';
import { TurismoController } from './controllers/turismo.controller';

@Module({
  controllers: [TurismoController],
  providers: [TurismoService],
  exports: [TurismoService],
  imports: [PrismaModule]
})
export class TurismoModule {}
