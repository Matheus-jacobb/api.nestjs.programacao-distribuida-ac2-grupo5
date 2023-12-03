import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { UpdateUserTurismoPayload } from '../models/update-user-turismo.payload';
import { CreateUserTurismoPayload } from '../models/create-user-turismo.payload';
import { UserTurismoProxy } from '../models/user-turismo.proxy';

@Injectable()
export class UserTurismoService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<UserTurismoProxy[]> {
    return this.prismaService.userTurismo.findMany();
  }

  public async findOne(id: number): Promise<UserTurismoProxy> {
    const turismo = await this.prismaService.userTurismo.findUnique({
      where: { id },
    });

    if (!turismo)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return turismo;
  }

  public async create(payload: CreateUserTurismoPayload): Promise<UserTurismoProxy> {
    const turismo = await this.prismaService.userTurismo.create({
      data: {
        eventoTicketId: payload.eventoTicketId,
        vooTicketId: payload.vooTicketId,
        hotelReservaId: payload.hotelReservaId,
        totalPrice: payload.totalPrice,
        turismoId: payload.turismoId,
        userId: payload.userId
      }
    });

    return turismo;
  }

  public async update(id: number, payload: UpdateUserTurismoPayload): Promise<UserTurismoProxy> {
    const turismo = await this.prismaService.userTurismo.update({
      where: { id },
      data: payload,
    });

    return turismo;
  }

  public async remove(id: number): Promise<void> {
    try {
      await this.prismaService.userTurismo.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir');
    }
  }

}
