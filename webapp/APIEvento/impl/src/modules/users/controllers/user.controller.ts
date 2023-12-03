//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { ProtectTo, UnprotectedRoute } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { mapCrud } from '../../../utils/crud';
import { RolesEnum } from '../../auth/models/roles.enum';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';
import { GetManyDefaultResponse } from '../../../common/get-many-default-response.proxy';

//#endregion

/**
 * A classe que representa o controlador que lida com os usuários
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    exclude: ['password'],
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
      'deleteOneBase',
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController extends BaseEntityCrudController<UserEntity, UserService> {

  //#region Constructor

  constructor(service: UserService) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @ApiOperation({ summary: 'Returns info about user logged.' })
  @Get('me')
  @ApiOkResponse({ description: 'Get info about user logged.', type: UserProxy })
  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  public getMe(@User() user: UserEntity): UserProxy {
    return mapCrud(user);
  }

  @ProtectTo(RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: GetManyDefaultResponse })
  public async getMany(@User() requestUser: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponse<UserProxy>> {
    return await this.service.listMany(requestUser, crudRequest).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @ParsedRequest() crudRequest: CrudRequest): Promise<UserProxy> {
    return await this.service.get(requestUser, +entityId, crudRequest).then(response => mapCrud(response));
  }

  @UnprotectedRoute()
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public createOne(
    @User() requestUser: UserEntity,
    @Body() payload: CreateUserPayload,
  ): Promise<UserProxy> {
    return this.service.create(requestUser, payload).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: UserProxy })
  public async replaceOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @Body() payload: UpdateUserPayload): Promise<UserProxy> {
    return await this.service.update(requestUser, +entityId, payload).then(response => mapCrud(response));
  }

  //#endregion

}
