import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTurismoPayload {
  @ApiProperty()
  hotelReservationId: string;

  @ApiProperty()
  flightTicketId: number;

  @ApiProperty()
  eventTicketId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  turismoId: number;

  @ApiProperty()
  userId: number;

}
