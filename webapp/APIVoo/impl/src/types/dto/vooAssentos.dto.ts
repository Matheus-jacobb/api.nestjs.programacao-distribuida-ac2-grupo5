import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AssentoDTO } from 'src/types/dto/assento.dto';

export class VooAssentosDTO {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Origem do voo' })
  @Expose()
  origem: string;

  @ApiProperty({ example: 'Destino do voo' })
  @Expose()
  destino: string;

  @ApiProperty({ example: '2023-10-10' })
  @Expose()
  data: Date;

  @ApiProperty({ type: [AssentoDTO] })
  @Expose()
  @Type(() => AssentoDTO)
  assentos: AssentoDTO[];
}
