import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsISO8601, IsNumber, IsUUID } from 'class-validator';

export class CreateReservationPayload {
  @ApiProperty()
  @IsUUID('4', { message: 'ID de usuário inválido.' })
  public userId: string;

  @ApiProperty()
  @IsUUID('4', { message: 'ID de quarto inválido.' })
  public roomId: string;

  @ApiProperty()
  @IsUUID('4', { message: 'ID de hotel inválido.' })
  public hotelId: string;

  @ApiProperty()
  @IsISO8601({}, { message: 'Data de início inválida.' })
  public startDate: string;

  @ApiProperty()
  @IsISO8601({}, { message: 'Data de término inválida.' })
  public endDate: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Valor total inválido.' })
  public totalPrice: number;

}
