import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateHotelPayload {
  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o nome.' })
  @MaxLength(128, { message: 'O nome não pode ter mais que 128 caracteres.' })
  public name: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o estado.' })
  @MaxLength(128, { message: 'O estado não pode ter mais que 128 caracteres.' })
  public state: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar a cidade.' })
  @MaxLength(128, { message: 'A cidade não pode ter mais que 128 caracteres.' })
  public city: string;

}
