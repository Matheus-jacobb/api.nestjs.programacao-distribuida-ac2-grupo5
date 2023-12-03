import { ApiProperty } from '@nestjs/swagger';

export class CreateTurismoPayload {
  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty()
  vooId: number;

  @ApiProperty()
  eventoId: number;

  @ApiProperty()
  hotelQuartoId: string;

  @ApiProperty()
  vooAssentoId: number;

}
