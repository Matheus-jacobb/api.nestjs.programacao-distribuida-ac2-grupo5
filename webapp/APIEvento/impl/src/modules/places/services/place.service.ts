//#region Imports

import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';

import { Repository } from 'typeorm';

import { BaseCrudService } from '../../../common/base-crud.service';
import { isAdminUser, isValid } from '../../../utils/functions';
import { PlaceEntity } from '../entities/place.entity';
import { CreatePlacePayload } from '../models/create-place.payload';
import { UpdatePlacePayload } from '../models/update-place.payload';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@Injectable()
export class PlaceService extends BaseCrudService<PlaceEntity> {

  //#region Constructor

  constructor(
    @InjectRepository(PlaceEntity)
    public repository: Repository<PlaceEntity>,
  ) {
    super(repository);
  }

  //#endregion

  //#region Crud Methods

  public async listMany(requestUser: UserEntity, crudRequest: CrudRequest): Promise<GetManyDefaultResponse<PlaceEntity> | PlaceEntity[]> {
    if (isAdminUser(requestUser))
      return await this.getMany(crudRequest);

    throw new ForbiddenException('Você não tem permissão para listar todos os usuários.');
  }

  public async get(requestUser: UserEntity, entityId: number, crudRequest?: CrudRequest): Promise<PlaceEntity> {
    let entity: PlaceEntity;

    if (crudRequest)
      entity = await super.getOne(crudRequest);
    else
      entity = await PlaceEntity.findById(entityId);

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${ entityId }) não foi encontrada.`);

    if (entityId === requestUser.id)
      return entity;

    if (isAdminUser(requestUser))
      return entity;

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  public async create(requestUser: UserEntity, payload: CreatePlacePayload): Promise<PlaceEntity> {
    const entity = this.getEntityFromPayload(payload);
    return await entity.save();
  }

  public async update(requestUser: UserEntity, entityId: number, payload: UpdatePlacePayload): Promise<PlaceEntity> {
    const userToUpdate = this.getEntityFromPayload(payload, entityId);

    if (entityId === requestUser.id)
      return await userToUpdate.save();

    if (isAdminUser(requestUser))
      return await userToUpdate.save();

    throw new UnauthorizedException('Você não tem permissão para realizar essa operação.');
  }

  //#endregion

  //#region Private Methods

  private getEntityFromPayload(payload: CreatePlacePayload | UpdatePlacePayload, id?: number): PlaceEntity {
    return new PlaceEntity({
      ...isValid(id) && { id },
      ...isValid(payload.email) && { email: payload.email },
      ...payload instanceof UpdatePlacePayload && isValid(payload.isActive) && { isActive: payload.isActive },
      ...payload instanceof CreatePlacePayload && isValid(payload.password) && { password: payload.password },
    });
  }

  //#endregion

}
