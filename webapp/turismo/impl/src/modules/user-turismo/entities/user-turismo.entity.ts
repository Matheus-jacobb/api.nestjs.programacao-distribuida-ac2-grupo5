import { ApiProperty } from "@nestjs/swagger";

export class UserTurismoEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: number;

  @ApiProperty()
  flightId: number;

}
