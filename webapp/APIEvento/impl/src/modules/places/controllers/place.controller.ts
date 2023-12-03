//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { ProtectTo, UnprotectedRoute } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { mapCrud } from '../../../utils/crud';
import { RolesEnum } from '../../auth/models/roles.enum';
import { PlaceEntity } from '../entities/place.entity';
import { CreatePlacePayload } from '../models/create-place.payload';
import { UpdatePlacePayload } from '../models/update-place.payload';
import { PlaceProxy } from '../models/place.proxy';
import { PlaceService } from '../services/place.service';
import { GetManyDefaultResponse } from '../../../common/get-many-default-response.proxy';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: PlaceEntity,
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
@ApiTags('places')
@Controller('places')
export class PlaceController extends BaseEntityCrudController<PlaceEntity, PlaceService> {

  //#region Constructor

  constructor(service: PlaceService) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @ProtectTo(RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: GetManyDefaultResponse })
  public async getMany(@User() requestUser: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponse<PlaceProxy>> {
    return await this.service.listMany(requestUser, crudRequest).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: PlaceProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @ParsedRequest() crudRequest: CrudRequest): Promise<PlaceProxy> {
    return await this.service.get(requestUser, +entityId, crudRequest).then(response => mapCrud(response));
  }

  @UnprotectedRoute()
  @Override()
  @ApiOkResponse({ type: PlaceProxy })
  public createOne(
    @User() requestUser: UserEntity,
    @Body() payload: CreatePlacePayload,
  ): Promise<PlaceProxy> {
    return this.service.create(requestUser, payload).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: PlaceProxy })
  public async replaceOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @Body() payload: UpdatePlacePayload): Promise<PlaceProxy> {
    return await this.service.update(requestUser, +entityId, payload).then(response => mapCrud(response));
  }

  //#endregion

}
