import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { hashPassword } from "../../../helpers/hash-password";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { CreateHotelPayload } from "../models/create-hotel.payload";
import { HotelsProxy } from "../models/hotels.proxy";
import { UpdateHotelsPayload } from "../models/update-hotels.payload";

@Injectable()
export class HotelsService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<HotelsProxy[]> {
    return this.prismaService.hotels.findMany();
  }

  public async findOne(id: string): Promise<HotelsProxy> {
    const hotel = await this.prismaService.hotels.findUnique({
      where: { id },
    });

    if (!hotel)
      throw new NotFoundException('O usuário com essa identificação não foi encontrado.');

    return hotel;
  }

  public async create(payload: CreateHotelPayload, requesUser): Promise<HotelsProxy> {
    console.log(requesUser);
    
    const hotel = await this.prismaService.hotels.create({
      data: {
        id: randomUUID(),
        name: payload.name,
        city: payload.city,
        state: payload.state,

      }
    });

    return hotel;
  }

  public async update(id: string, payload: UpdateHotelsPayload): Promise<HotelsProxy> {
    const hotel = await this.prismaService.hotels.update({
      where: { id },
      data: payload,
    });

    return hotel;
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prismaService.hotels.delete({ where: { id } });

    } catch (error) {
      throw new Error('Erro ao excluir usuário');
    }
  }

}
