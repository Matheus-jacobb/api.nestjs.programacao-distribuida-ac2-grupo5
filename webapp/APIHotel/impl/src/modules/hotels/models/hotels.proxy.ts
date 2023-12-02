import { ApiProperty } from "@nestjs/swagger";
import { ReservationEntity } from "../../reservations/entities/reservation.entity";
import { RoomEntity } from "../../rooms/entities/room.entity";

export interface HotelsProxy {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  state: string;

  city: string;

  bedrooms?: RoomEntity[];

  reservations?: ReservationEntity[];
}
