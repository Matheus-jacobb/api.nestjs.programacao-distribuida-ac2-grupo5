import { ApiProperty } from '@nestjs/swagger';

export class AssentoUpdateDTO {
  @ApiProperty({ example: 'A' })
  fileira: string;

  @ApiProperty({ example: 1 })
  numero: number;
}
