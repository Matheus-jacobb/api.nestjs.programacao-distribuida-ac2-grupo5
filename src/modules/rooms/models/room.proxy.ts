import { ApiProperty } from "@nestjs/swagger";
import { HotelEntity } from "../../hotels/entities/hotel.entity";
import { ReservationEntity } from "../../reservations/entities/reservation.entity";

export interface RoomProxy {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  category: string;

  bedType: string;

  dailyPrice: string;

  hotelId: string;

  hotel?: HotelEntity;

  reservations?: ReservationEntity[];
}
