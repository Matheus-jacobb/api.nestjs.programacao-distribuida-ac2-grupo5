import { ApiProperty } from '@nestjs/swagger';

export class ReservaDTO {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Thiago Sanches' })
  nome: string;
}
