import { ApiProperty } from '@nestjs/swagger';

export class VooDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Origem do voo' })
  origem: string;

  @ApiProperty({ example: 'Destino do voo' })
  destino: string;

  @ApiProperty({ example: '2023-10-10' })
  data: Date;
}
