import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { RoomController } from "./controllers/room.controller";
import { RoomService } from "./services/room.service";

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
  imports: [PrismaModule]
})
export class RoomModule {}
