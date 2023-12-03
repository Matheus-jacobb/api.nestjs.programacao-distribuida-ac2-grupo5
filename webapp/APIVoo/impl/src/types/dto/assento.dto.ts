import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AssentoDTO {
  @ApiProperty({ example: 1 })
  @Expose()
  fileira: string;

  @ApiProperty({ example: 1 })
  @Expose()
  numero: number;

  @ApiProperty({ example: true })
  @Expose()
  reservado: boolean;
}
