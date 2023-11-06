import { ApiProperty } from "@nestjs/swagger";
import { HotelEntity } from "../../hotels/entities/hotel.entity";
import { ReservationEntity } from "../../reservations/entities/reservation.entity";

export class RoomEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  category: string;

  @ApiProperty()
  bedType: string;

  @ApiProperty()
  dailyPrice: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty({ type: () => HotelEntity, required: false })
  hotel?: HotelEntity;

  @ApiProperty({ type: () => ReservationEntity, isArray: true })
  reservations?: ReservationEntity[];
}
