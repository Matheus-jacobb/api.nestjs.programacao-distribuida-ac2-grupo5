import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AssentoInsertDTO {
  @ApiProperty({ example: 'A' })
  @Expose()
  fileira: string;

  @ApiProperty({ example: 1 })
  @Expose()
  numero: number;

  @ApiProperty({ example: 1 })
  vooId: number;
}
