import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assento } from './assento.entity';

@Entity()
export class Reserva {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  rg: string;

  @OneToOne(() => Assento)
  @JoinColumn()
  assento: Assento;
}
