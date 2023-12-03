//#region Imports

import { NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import { TypeOrmValueTypes } from '../models/enums/type-orm-value.types';
import { VerifyProxy } from '../models/proxys/verify.proxy';
import { BaseEntity } from './base-entity';

//#endregion

export class BaseCrudService<TEntity extends BaseEntity> extends TypeOrmCrudService<TEntity> {

  //#region Constructor

  constructor(
    public readonly repository: Repository<TEntity>,
  ) {
    super(repository);
  }

  //#endregion

  //#region Public Methods

  public async exists(ids: number[]): Promise<VerifyProxy> {
    const count = await this.repository.createQueryBuilder().whereInIds(ids).getCount();

    return new VerifyProxy(count === ids.length);
  }

  public async findById(entityId: number, validateIsActive: boolean = true, relations?: string[]): Promise<TEntity> {
    const entity = await this.repository.findOne({
      where: {
        id: entityId,
        ...validateIsActive && { isActive: TypeOrmValueTypes.TRUE },
      },
      relations,
    });

    if (!entity)
      throw new NotFoundException(`A entidade procurada pela identificação (${ entityId }) não foi encontrada.`);

    return entity;
  }

  //#endregion

}
