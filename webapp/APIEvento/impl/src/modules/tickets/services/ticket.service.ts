//#region Imports

import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';

import { Repository } from 'typeorm';

import { BaseCrudService } from '../../../common/base-crud.service';
import { isAdminUser, isValid } from '../../../utils/functions';
import { TicketEntity } from '../entities/ticket.entity';
import { CreateTicketPayload } from '../models/create-ticket.payload';
import { UpdateTicketPayload } from '../models/update-ticket.payload';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@Injectable()
export class TicketService extends BaseCrudService<TicketEntity> {

  //#region Constructor

  constructor(
    @InjectRepository(TicketEntity)
    public repository: Repository<TicketEntity>,
  ) {
    super(repository);
  }

  //#endregion

  //#region Crud Methods

  public async listMany(requestUser: UserEntity, crudRequest: CrudRequest): Promise<GetManyDefaultResponse<TicketEntity> | TicketEntity[]> {
    if (isAdminUser(requestUser))
      return await this.getMany(crudRequest);

    throw new ForbiddenException('Você não tem permissão para listar todos os usuários.');
  }

  public async get(requestUser: UserEntity, entityId: number, crudRequest?: CrudRequest): Promise<TicketEntity> {
    let entity: TicketEntity;

    if (crudRequest)
      entity = await super.getOne(crudRequest);
    else
      entity = await TicketEntity.findById(entityId);

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${ entityId }) não foi encontrada.`);

    if (entityId === requestUser.id)
      return entity;

    if (isAdminUser(requestUser))
      return entity;

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  public async create(requestUser: UserEntity, payload: CreateTicketPayload): Promise<TicketEntity> {
    const entity = this.getEntityFromPayload(payload);
    return await entity.save();
  }

  public async update(requestUser: UserEntity, entityId: number, payload: UpdateTicketPayload): Promise<TicketEntity> {
    const userToUpdate = this.getEntityFromPayload(payload, entityId);

    if (entityId === requestUser.id)
      return await userToUpdate.save();

    if (isAdminUser(requestUser))
      return await userToUpdate.save();

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  //#endregion

  //#region Private Methods

  private getEntityFromPayload(payload: CreateTicketPayload | UpdateTicketPayload, id?: number): TicketEntity {
    return new TicketEntity({
      ...isValid(id) && { id },
      ...isValid(payload.email) && { email: payload.email },
      ...payload instanceof UpdateTicketPayload && isValid(payload.isActive) && { isActive: payload.isActive },
      ...payload instanceof CreateTicketPayload && isValid(payload.password) && { password: payload.password },
    });
  }

  //#endregion

}
