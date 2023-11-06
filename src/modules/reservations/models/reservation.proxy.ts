import { HotelEntity } from "../../hotels/entities/hotel.entity";
import { RoomEntity } from "../../rooms/entities/room.entity";
import { UserEntity } from "../../users/entities/user.entity";

export class ReservationProxy {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  userId: string;

  roomId: string;

  hotelId: string;

  startDate: Date;

  endDate: Date;

  totalPrice: number;

  user?: UserEntity;

  room?: RoomEntity;

  hotel?: HotelEntity;
}
