import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule]
})
export class UserModule {}