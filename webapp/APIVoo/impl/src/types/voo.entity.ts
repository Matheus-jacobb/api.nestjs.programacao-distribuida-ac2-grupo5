import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assento } from './assento.entity';
import { TipoVooType } from './enum/tipo-voo';


@Entity()
export class Voo{
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    origem: string;
    
    @Column()
    destino: string;

    @Column()
    data: Date;

    @OneToMany(() => Assento, assento => assento.voo)
    assentos: Assento[]
}