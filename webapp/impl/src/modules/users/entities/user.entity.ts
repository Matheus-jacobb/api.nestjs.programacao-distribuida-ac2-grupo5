import { ApiProperty } from "@nestjs/swagger";
import { ReservationEntity } from "../../reservations/entities/reservation.entity";

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: () => ReservationEntity, isArray: true })
  reservations: ReservationEntity[];
}
