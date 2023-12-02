import { ApiProperty } from "@nestjs/swagger";
import { ReservationEntity } from "../../reservations/entities/reservation.entity";
import { RoomEntity } from "../../rooms/entities/room.entity";

export class HotelEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty({ type: () => RoomEntity })
  bedrooms: RoomEntity[];

  @ApiProperty({ type: () => ReservationEntity })
  reservations: ReservationEntity[];
}
