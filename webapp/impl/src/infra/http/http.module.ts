import { Module } from '@nestjs/common';
import { HotelsController } from "../../modules/hotels/controllers/hotels.controller";
import { HotelsModule } from "../../modules/hotels/hotels.module";
import { ReservationController } from "../../modules/reservations/controllers/reservation.controller";
import { ReservationModule } from "../../modules/reservations/reservation.module";
import { RoomController } from "../../modules/rooms/controllers/room.controller";
import { RoomModule } from "../../modules/rooms/room.module";
import { UserModule } from '../../modules/users/user.module';
import { UserController } from '../../modules/users/controllers/user.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthController } from '../../modules/auth/controllers/auth.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoomModule,
    ReservationModule,
    HotelsModule
  ],
  controllers: [
    AuthController,
    UserController,
    RoomController,
    ReservationController,
    HotelsController
  ],
})
export class HttpModule { }
