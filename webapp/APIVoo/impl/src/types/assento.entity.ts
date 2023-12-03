import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Voo } from './voo.entity';

@Entity()
export class Assento {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  fileira: string;

  @Column()
  @Expose()
  numero: number;

  @ManyToOne(() => Voo, (voo) => voo.assentos)
  voo: Voo;

  @Column()
  @Expose()
  reservado: boolean;
}
