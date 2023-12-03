import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservaInsertDTO {
  @ApiProperty({ example: 'Thiago' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Sanches' })
  @IsString()
  @IsNotEmpty()
  sobrenome: string;

  @ApiProperty({ example: '12345678-9' })
  @IsString()
  @IsNotEmpty()
  rg: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  vooId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  assentoId: number;
}
