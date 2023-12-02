import { TurismoEntity } from '../../turismo/entities/turismo.entity';

export interface UserProxy {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  turismo?: TurismoEntity[];
}
