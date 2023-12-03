//#region Imports

import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';

import { Repository } from 'typeorm';

import { BaseCrudService } from '../../../common/base-crud.service';
import { isAdminUser, isValid } from '../../../utils/functions';
import { EventEntity } from '../entities/event.entity';
import { CreateEventPayload } from '../models/create-event.payload';
import { UpdateEventPayload } from '../models/update-event.payload';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@Injectable()
export class EventService extends BaseCrudService<EventEntity> {

  //#region Constructor

  constructor(
    @InjectRepository(EventEntity)
    public repository: Repository<EventEntity>,
  ) {
    super(repository);
  }

  //#endregion

  //#region Crud Methods

  public async listMany(requestUser: UserEntity, crudRequest: CrudRequest): Promise<GetManyDefaultResponse<EventEntity> | EventEntity[]> {
    if (isAdminUser(requestUser))
      return await this.getMany(crudRequest);

    throw new ForbiddenException('Você não tem permissão para listar todos os usuários.');
  }

  public async get(requestUser: UserEntity, entityId: number, crudRequest?: CrudRequest): Promise<EventEntity> {
    let entity: EventEntity;

    if (crudRequest)
      entity = await super.getOne(crudRequest);
    else
      entity = await EventEntity.findById(entityId);

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${entityId}) não foi encontrada.`);

    if (entityId === requestUser.id)
      return entity;

    if (isAdminUser(requestUser))
      return entity;

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  public async create(requestUser: UserEntity, payload: CreateEventPayload): Promise<EventEntity> {
    const entity = this.getEntityFromPayload(payload);
    return await entity.save();
  }

  public async update(requestUser: UserEntity, entityId: number, payload: UpdateEventPayload): Promise<EventEntity> {
    const userToUpdate = this.getEntityFromPayload(payload, entityId);

    if (entityId === requestUser.id)
      return await userToUpdate.save();

    if (isAdminUser(requestUser))
      return await userToUpdate.save();

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  //#endregion

  //#region Private Methods

  private getEntityFromPayload(payload: CreateEventPayload | UpdateEventPayload, id?: number): EventEntity {
    return new EventEntity({
      ...isValid(id) && { id },
      ...isValid(payload.type) && { type: payload.type },
      ...isValid(payload.placeId) && { placeId: payload.placeId },
      ...isValid(payload.startDate) && { startDate: payload.startDate },
      ...isValid(payload.endDate) && { endDate: payload.endDate },
      ...payload instanceof UpdateEventPayload && isValid(payload.isActive) && { isActive: payload.isActive },
    });
  }

  //#endregion

}
