import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { HotelsController } from "./controllers/hotels.controller";
import { HotelsService } from "./services/hotels.service";

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
  imports: [PrismaModule]
})
export class HotelsModule {}
