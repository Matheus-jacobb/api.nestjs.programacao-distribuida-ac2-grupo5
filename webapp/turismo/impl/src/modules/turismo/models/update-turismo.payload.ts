import { ApiProperty } from '@nestjs/swagger';

export class UpdateTurismoPayload {
  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty()
  flightId: number;

}
