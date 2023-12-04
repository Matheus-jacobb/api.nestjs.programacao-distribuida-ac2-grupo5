import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { hashPassword } from "../../../helpers/hash-password";
import { PrismaService } from "../../../infra/database/prisma/prisma.service";
import { CreateUserPayload } from "../models/create-user.payload";
import { UpdateUserPayload } from "../models/update-user.payload";
import { UserProxy } from "../models/user.proxy";
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  public findAll(): Promise<UserProxy[]> {
    return this.prismaService.users.findMany()
  }

  public async findOne(id: number): Promise<UserProxy> {
    const user: UserEntity = await this.prismaService.users.findUnique({
      where: { id }
    });

    if (!user)
      throw new NotFoundException("O usuário com essa identificação não foi encontrado.");

    return user
  }

  public async findByEmail(email: string): Promise<UserProxy | null> {
    const user = await this.prismaService.users.findUnique({ where: { email } });

    return user;
  }

  public async create(payload: CreateUserPayload): Promise<UserProxy> {
    const isARegisteredEmail = await this.findByEmail(payload.email);

    if (isARegisteredEmail)
      throw new BadRequestException("O e-mail informado já possui um cadastro.");

    const user = await this.prismaService.users.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: await hashPassword(payload.password),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return user
  }

  public async update(id: number, payload: UpdateUserPayload): Promise<UserProxy> {
    const user = await this.prismaService.users.update({
      where: { id },
      data: payload
    });

    return user
  }

  public async remove(id: number): Promise<void> {
    try {
      await this.prismaService.users.delete({ where: { id } });

    } catch (error) {
      throw new Error("Erro ao excluir usuário");
    }
  }

}
