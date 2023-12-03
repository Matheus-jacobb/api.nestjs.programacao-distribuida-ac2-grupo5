//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { ProtectTo, UnprotectedRoute } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { mapCrud } from '../../../utils/crud';
import { RolesEnum } from '../../auth/models/roles.enum';
import { EventEntity } from '../entities/event.entity';
import { CreateEventPayload } from '../models/create-event.payload';
import { UpdateEventPayload } from '../models/update-event.payload';
import { EventProxy } from '../models/event.proxy';
import { EventService } from '../services/event.service';
import { GetManyDefaultResponse } from '../../../common/get-many-default-response.proxy';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: EventEntity,
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
@ApiTags('events')
@Controller('events')
export class EventController extends BaseEntityCrudController<EventEntity, EventService> {

  //#region Constructor

  constructor(service: EventService) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @ProtectTo(RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: GetManyDefaultResponse })
  public async getMany(@User() requestUser: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponse<EventProxy>> {
    return await this.service.listMany(requestUser, crudRequest).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: EventProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @ParsedRequest() crudRequest: CrudRequest): Promise<EventProxy> {
    return await this.service.get(requestUser, +entityId, crudRequest).then(response => mapCrud(response));
  }

  @UnprotectedRoute()
  @Override()
  @ApiOkResponse({ type: EventProxy })
  public createOne(
    @User() requestUser: UserEntity,
    @Body() payload: CreateEventPayload,
  ): Promise<EventProxy> {
    return this.service.create(requestUser, payload).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: EventProxy })
  public async replaceOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @Body() payload: UpdateEventPayload): Promise<EventProxy> {
    return await this.service.update(requestUser, +entityId, payload).then(response => mapCrud(response));
  }

  //#endregion

}
