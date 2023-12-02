import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { TurismoProxy } from '../models/turismo.proxy';
import { CreateTurismoPayload } from '../models/create-turismo.payload';
import { UpdateTurismoPayload } from '../models/update-turismo.payload';

@Injectable()
export class TurismoService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<TurismoProxy[]> {
    return this.prismaService.turismo.findMany();
  }

  public async findOne(id: number): Promise<TurismoProxy> {
    const turismo = await this.prismaService.turismo.findUnique({
      where: { id },
    });

    if (!turismo)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return turismo;
  }

  public async create(payload: CreateTurismoPayload): Promise<TurismoProxy> {
    const turismo = await this.prismaService.turismo.create({
      data: {
        name: payload.name,
        flightId: payload.flightId,
        hotelId: payload.hotelId,
        eventId: payload.eventId
      }
    });

    return turismo;
  }

  public async update(id: number, payload: UpdateTurismoPayload): Promise<TurismoProxy> {
    const turismo = await this.prismaService.turismo.update({
      where: { id },
      data: payload,
    });

    return turismo;
  }

  public async remove(id: number): Promise<void> {
    try {
      await this.prismaService.turismo.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir usuário');
    }
  }

}
