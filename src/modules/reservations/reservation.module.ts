import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { ReservationController } from "./controllers/reservation.controller";
import { ReservationService } from "./services/reservation.service";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
  imports: [PrismaModule]
})
export class ReservationModule {}
