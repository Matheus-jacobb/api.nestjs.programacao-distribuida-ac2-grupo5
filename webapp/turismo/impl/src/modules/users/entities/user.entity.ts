import { ApiProperty } from "@nestjs/swagger";
import { TurismoEntity } from '../../turismo/entities/turismo.entity';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: 'user' })
  role: string;

  @ApiProperty({ type: () => TurismoEntity, isArray: true })
  turismo?: TurismoEntity[];
}
