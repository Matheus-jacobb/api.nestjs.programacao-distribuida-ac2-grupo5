import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { VooInsertDTO } from 'src/types/dto/voo-insert.dto';
import { VooDTO } from 'src/types/dto/voo.dto';
import { Voo } from 'src/types/voo.entity';
import { Repository } from 'typeorm';
import { VooAssembler } from './assembler/voo.assembler';

@Injectable()
export class VooService {
  constructor(
    @InjectRepository(Voo)
    private readonly vooRepository: Repository<Voo>,
  ) {}

  async create(vooInsertDTO: VooInsertDTO): Promise<VooDTO> {
    const voo = plainToClass(Voo, vooInsertDTO);
    if (voo.data instanceof Date) {
      const dia = voo.data.getDate().toString().padStart(2, '0');
      const mes = (voo.data.getMonth() + 1).toString().padStart(2, '0');
      const ano = voo.data.getFullYear();
      voo.data = new Date(`${ano}-${mes}-${dia}`);
    }
    await validateOrReject(voo);

    const voosaved = await this.vooRepository.save(voo);

    const vooDTO = new VooDTO();
    vooDTO.id = voosaved.id;
    vooDTO.origem = voosaved.origem;
    vooDTO.destino = voosaved.destino;
    vooDTO.data = voosaved.data;
    return voosaved;
  }

  async findAll(): Promise<VooDTO[]> {
    const voos = await this.vooRepository.find();
    return VooAssembler.voosToDTOs(voos);
  }

  async findOne(id: number): Promise<VooDTO> {
    const voo = await this.vooRepository.findOne({
      where: { id: id },
    });

    return VooAssembler.vooToDTO(voo);
  }

  async findEntity(id: number): Promise<Voo> {
    const voo = await this.vooRepository.findOne({
      relations: ['assentos'],
      where: { id: id },
    });

    if (!voo) throw new BadRequestException('Voo não encontrado');

    return voo;
  }

  async update(id: number, updatedVoo: Voo): Promise<VooDTO> {
    await this.vooRepository.update(id, updatedVoo);
    const vooUpdated = await this.vooRepository.findOne({
      where: { id },
    });

    return VooAssembler.vooToDTO(vooUpdated);
  }

  async remove(id: number): Promise<void> {
    await this.vooRepository.delete(id);
  }
}
