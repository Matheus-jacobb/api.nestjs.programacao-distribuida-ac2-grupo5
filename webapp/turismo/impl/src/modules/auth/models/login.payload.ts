import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, MinLength } from "class-validator";

export class LoginPayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o e-mail do usuário.' })
  email!: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar a senha do usuário.' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' })
  password!: string;
}