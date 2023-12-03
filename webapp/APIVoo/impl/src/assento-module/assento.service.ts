import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Assento } from 'src/types/assento.entity';
import { AssentoInsertDTO } from 'src/types/dto/assento-insert.dto';
import { AssentoUpdateDTO } from 'src/types/dto/assento-update.dto';
import { AssentoDTO } from 'src/types/dto/assento.dto';
import { Voo } from 'src/types/voo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssentoService {
  async desreservar(id: number) {
    await this.assentoRepository.update(id, { reservado: false });
  }
  async findByVooId(voo: Voo) {
    const assentos = await this.assentoRepository.find({
      where: { voo: voo },
    });
    const assentosDTO = plainToClass(AssentoDTO, assentos);
    return assentosDTO;
  }
  constructor(
    @InjectRepository(Assento)
    private readonly assentoRepository: Repository<Assento>,
  ) {}

  async create(
    assentoInsertDTO: AssentoInsertDTO,
    voo: Voo,
  ): Promise<AssentoDTO> {
    const assentoSaved = await this.assentoRepository.save({
      ...assentoInsertDTO,
      reservado: false,
      voo,
    });

    const assentoCreated = plainToClass(AssentoDTO, assentoSaved);
    return assentoCreated;
  }

  async findAll(): Promise<AssentoDTO[]> {
    const assentos = await this.assentoRepository.find();
    const assentosDTO = plainToClass(AssentoDTO, assentos);
    return assentosDTO;
  }

  async findOne(id: number): Promise<AssentoDTO> {
    const assento = await this.assentoRepository.findOne({
      where: { id: id },
    });
    const assentoDTO = plainToClass(AssentoDTO, assento);
    return assentoDTO;
  }

  async findEntity(id: number): Promise<Assento> {
    const assento = await this.assentoRepository.findOne({
      relations: ['voo'],
      where: { id: id },
    });

    if (!assento) throw new BadRequestException('Assento não encontrado');

    return assento;
  }

  async update(
    id: number,
    updatedAssento: AssentoUpdateDTO,
  ): Promise<AssentoDTO> {
    await this.assentoRepository.update(id, updatedAssento);
    const assentoUpdated = await this.assentoRepository.findOne({
      where: { id },
    });

    const assentoDTO = plainToClass(AssentoDTO, assentoUpdated);
    return assentoDTO;
  }

  async reservar(id: number): Promise<AssentoDTO> {
    await this.assentoRepository.update(id, { reservado: true });
    const assentoUpdated = await this.assentoRepository.findOne({
      where: { id },
    });

    const assentoDTO = plainToClass(AssentoDTO, assentoUpdated);
    return assentoDTO;
  }

  async remove(id: number): Promise<void> {
    await this.assentoRepository.delete(id);
  }
}
