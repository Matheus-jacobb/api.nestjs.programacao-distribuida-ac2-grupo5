import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { CreateRoomPayload } from "../models/create-room.payload";
import { UpdateRoomPayload } from "../models/update-room.payload";
import { RoomProxy } from "../models/room.proxy";
import { hashPassword } from "../../../helpers/hash-password";

@Injectable()
export class RoomService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<RoomProxy[]> {
    return this.prismaService.rooms.findMany();
  }

  public async findOne(id: string): Promise<RoomProxy> {
    const room = await this.prismaService.rooms.findUnique({
      where: { id },
    });

    if (!room)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return room;
  }

  public async create(payload: CreateRoomPayload): Promise<RoomProxy> {

    const room = await this.prismaService.rooms.create({
      data: {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        bedType: payload.bedType,
        category: payload.category,
        dailyPrice: payload.dailyPrice,
        hotelId: payload.hotelId
      }
    });

    return room;
  }

  public async update(id: string, payload: UpdateRoomPayload): Promise<RoomProxy> {
    const room = await this.prismaService.rooms.update({
      where: { id },
      data: payload,
    });

    return room;
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prismaService.rooms.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir usuário');
    }
  }

}
