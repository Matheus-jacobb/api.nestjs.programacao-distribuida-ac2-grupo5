import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { JwtStrategy } from "./services/jwt.strategy.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}