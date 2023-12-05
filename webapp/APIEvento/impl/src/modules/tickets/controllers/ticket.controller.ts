//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { ProtectTo, UnprotectedRoute } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { mapCrud } from '../../../utils/crud';
import { RolesEnum } from '../../auth/models/roles.enum';
import { TicketEntity } from '../entities/ticket.entity';
import { CreateTicketPayload } from '../models/create-ticket.payload';
import { UpdateTicketPayload } from '../models/update-ticket.payload';
import { TicketProxy } from '../models/ticket.proxy';
import { TicketService } from '../services/ticket.service';
import { GetManyDefaultResponse } from '../../../common/get-many-default-response.proxy';
import { UserEntity } from '../../users/entities/user.entity';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: TicketEntity,
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
@ApiTags('tickets')
@Controller('tickets')
export class TicketController extends BaseEntityCrudController<TicketEntity, TicketService> {

  //#region Constructor

  constructor(service: TicketService) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  @ProtectTo(RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: GetManyDefaultResponse })
  public async getMany(@User() requestUser: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponse<TicketProxy>> {
    return await this.service.listMany(requestUser, crudRequest).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: TicketProxy })
  public async getOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @ParsedRequest() crudRequest: CrudRequest): Promise<TicketProxy> {
    return await this.service.get(requestUser, +entityId, crudRequest).then(response => mapCrud(response));
  }

  @UnprotectedRoute()
  @Override()
  @ApiOkResponse({ type: TicketProxy })
  public createOne(
    @Body() payload: CreateTicketPayload,
  ): Promise<TicketProxy> {
    return this.service.create(payload).then(response => mapCrud(response));
  }

  @ProtectTo(RolesEnum.USER, RolesEnum.ADMIN)
  @Override()
  @ApiOkResponse({ type: TicketProxy })
  public async replaceOne(@User() requestUser: UserEntity, @Param('id') entityId: number, @Body() payload: UpdateTicketPayload): Promise<TicketProxy> {
    return await this.service.update(requestUser, +entityId, payload).then(response => mapCrud(response));
  }

  //#endregion

}
