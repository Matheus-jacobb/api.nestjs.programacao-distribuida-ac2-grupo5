import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { UserTurismoService } from './services/user-turismo.service';
import { UserTurismoController } from './controllers/user-turismo.controller';

@Module({
  controllers: [UserTurismoController],
  providers: [UserTurismoService],
  exports: [UserTurismoService],
  imports: [PrismaModule]
})
export class UserTurismoModule {}
