import { ApiProperty } from '@nestjs/swagger';

export class CreateTurismoPayload {
  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty()
  flightId: number;

  @ApiProperty()
  eventId: number;

}
