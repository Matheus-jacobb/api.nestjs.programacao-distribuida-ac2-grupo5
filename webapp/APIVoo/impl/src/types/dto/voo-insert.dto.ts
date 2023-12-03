import { ApiProperty } from "@nestjs/swagger";
import { TipoVooType } from "../enum/tipo-voo";

export class VooInsertDTO {
  @ApiProperty({  example: 'Origem do voo' })
  origem: string;

  @ApiProperty({  example: 'Destino do voo' })
  destino: string;

  @ApiProperty({  example: '2023-10-10' })
  data: Date;
  }
  