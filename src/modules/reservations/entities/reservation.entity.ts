import { ApiProperty } from "@nestjs/swagger";
import { HotelEntity } from "../../hotels/entities/hotel.entity";
import { RoomEntity } from "../../rooms/entities/room.entity";
import { UserEntity } from "../../users/entities/user.entity";

export class ReservationEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty({ type: () => UserEntity, required: false })
  user?: UserEntity;

  @ApiProperty({ type: () => RoomEntity, required: false })
  room?: RoomEntity;

  @ApiProperty({ type: () => HotelEntity, required: false })
  hotel?: HotelEntity;
}
