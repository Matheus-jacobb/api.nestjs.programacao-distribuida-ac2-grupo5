import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTurismoPayload {
  @ApiProperty()
  hotelReservaId: string;

  @ApiProperty()
  vooTicketId: number;

  @ApiProperty()
  eventoTicketId: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  turismoId: number;

  @ApiProperty()
  userId: number;

}
