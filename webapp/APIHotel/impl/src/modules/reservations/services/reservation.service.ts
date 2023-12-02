import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { CreateReservationPayload } from "../models/create-reservation.payload";
import { ReservationProxy } from "../models/reservation.proxy";
import { UpdateReservationPayload } from "../models/update-reservation.payload";
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class ReservationService {

  constructor(private prismaService: PrismaService) { }

  public findAll(requestUser: UserEntity): Promise<ReservationProxy[]> {
    if (requestUser.role === 'admin') {
      return this.prismaService.reservation.findMany();
    }

    return this.prismaService.reservation.findMany({
      where: {
        userId: requestUser.id
      }
    });
  }

  public async findOne(id: string, requestUser: UserEntity): Promise<ReservationProxy> {
    const reservation = await this.prismaService.reservation.findUnique({
      where: { id, userId: requestUser.id },
    });

    if (!reservation)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return reservation;
  }

  public findByUser(id, requestUser: UserEntity): Promise<ReservationProxy[]> {
    if (requestUser.role !== 'admin')
      id = requestUser.id

    return this.prismaService.reservation.findMany({
      where: {
        userId: id
      }
    });
  }

  public async create(payload: CreateReservationPayload): Promise<ReservationProxy> {

    await this.prismaService.hotels.findUniqueOrThrow({ where: { id: payload.hotelId } }).catch(() => {
      throw new NotFoundException('O hotel com essa identificação não foi encontrado')
    })

    await this.prismaService.rooms.findUniqueOrThrow({ where: { id: payload.roomId } }).catch(() => {
      throw new NotFoundException('O quarto com essa identificação não foi encontrado')
    })

    await this.prismaService.users.findUniqueOrThrow({ where: { id: payload.userId } }).catch(() => {
      throw new NotFoundException('O usuário com essa identificação não foi encontrado')
    })

    const reservationExist = await this.prismaService.reservation.findFirst({
      where: {
        AND: [
          {
            OR: [
              { startDate: { lte: payload?.startDate }, endDate: { gte: payload?.endDate } },
              { startDate: { gte: payload?.startDate }, endDate: { lte: payload?.endDate } },
            ]
          },
          { hotelId: payload.hotelId },
          { roomId: payload.roomId }
        ]
      }
    })

    if (reservationExist)
      throw new BadRequestException('Já existe reserva para esse dia, tente novamente')

    const reservation = await this.prismaService.reservation.create({
      data: {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        hotelId: payload.hotelId,
        userId: payload.userId,
        roomId: payload.roomId,
        startDate: payload.startDate,
        endDate: payload.endDate,
        totalPrice: payload.totalPrice
      }
    });

    return reservation;
  }

  public async update(id: string, payload: UpdateReservationPayload): Promise<ReservationProxy> {
    const reservation = await this.prismaService.reservation.update({
      where: { id },
      data: payload,
    });

    return reservation;
  }

  public async remove(id: string, requestUser: UserEntity): Promise<void> {
    try {
      const reservation = await this.prismaService.reservation.findFirst({ where: { userId: requestUser.id } });

      if (!reservation)
        throw new NotFoundException('Reserva não encontrada');

      if (reservation.userId !== requestUser.id && requestUser.role !== 'admin')
        throw new ForbiddenException('Você não possui permissão para apagar essa reserva')

      await this.prismaService.reservation.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir reserva');
    }
  }

}
