import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Assento } from 'src/types/assento.entity';
import { ReservaInsertDTO } from 'src/types/dto/reserva-insert.dto';
import { ReservaDTO } from 'src/types/dto/reserva.dto';
import { Reserva } from 'src/types/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(
    reservaInsertDTO: ReservaInsertDTO,
    assento: Assento,
  ): Promise<ReservaDTO> {
    if (assento.reservado) {
      throw new BadRequestException('Assento já reservado');
    }

    if (assento.voo.id !== reservaInsertDTO.vooId) {
      throw new BadRequestException('Assento não pertence ao voo');
    }

    const reserva = new Reserva();
    reserva.assento = assento;
    reserva.nome = reservaInsertDTO.nome;
    reserva.sobrenome = reservaInsertDTO.sobrenome;
    reserva.rg = reservaInsertDTO.rg;

    const reservaSaved = await this.reservaRepository.save(reserva);

    const assentoCreated = plainToClass(ReservaDTO, reservaSaved);
    return assentoCreated;
  }

  async findOne(id: number): Promise<ReservaDTO> {
    const assento = await this.reservaRepository.findOne({
      where: { id: id },
    });
    const reservaDTO = plainToClass(ReservaDTO, assento);
    return reservaDTO;
  }

  async findEntity(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      relations: ['assento'],
      where: { id: id },
    });
    return reserva;
  }

  async remove(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
