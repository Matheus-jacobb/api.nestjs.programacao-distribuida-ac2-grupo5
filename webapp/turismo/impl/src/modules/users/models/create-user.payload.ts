import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserPayload {
  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o nome.' })
  @MaxLength(128, { message: 'O nome não pode ter mais que 128 caracteres.' })
  public name: string;

  @ApiProperty()
  @IsString({ message: 'É necessário enviar um texto válido.' })
  @IsEmail({}, { message: 'É necessário enviar um e-mail válido' })
  @MaxLength(128, { message: 'O e-mail não pode ter mais que 128 caracteres.' })
  public email: string;

  @ApiProperty()
  @IsString({ message: 'É necessário enviar um texto válido.' })
  public password: string;

}
