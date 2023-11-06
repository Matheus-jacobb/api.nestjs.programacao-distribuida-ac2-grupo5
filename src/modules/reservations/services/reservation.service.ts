import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { CreateReservationPayload } from "../models/create-reservation.payload";
import { ReservationProxy } from "../models/reservation.proxy";
import { UpdateReservationPayload } from "../models/update-reservation.payload";

@Injectable()
export class ReservationService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<ReservationProxy[]> {
    return this.prismaService.reservation.findMany();
  }

  public async findOne(id: string): Promise<ReservationProxy> {
    const reservation = await this.prismaService.reservation.findUnique({
      where: { id },
    });

    if (!reservation)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return reservation;
  }

  public async create(payload: CreateReservationPayload): Promise<ReservationProxy> {

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

  public async remove(id: string): Promise<void> {
    try {
      await this.prismaService.reservation.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir usuário');
    }
  }

}
