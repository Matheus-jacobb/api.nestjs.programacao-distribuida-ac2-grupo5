import { ApiProperty } from "@nestjs/swagger";

export class TurismoEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty()
  vooId: number;

  @ApiProperty()
  eventoId: number;

}
