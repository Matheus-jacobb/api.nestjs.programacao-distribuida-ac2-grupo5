//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { TicketEntity } from '../entities/ticket.entity';
import { UserProxy } from '../../users/models/user.proxy';
import { EventProxy } from '../../events/models/event.proxy';

//#endregion

export class TicketProxy extends BaseCrudProxy {

  constructor(user: Partial<TicketEntity> | TicketEntity) {
    super(user);

    this.userId = user.userId;
    this.eventId = user.eventId;
    this.isVip = user.isVip;
    this.chair = user.chair;
  }

  //#region Public Properties

  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public eventId: number;

  @ApiProperty()
  public isVip: boolean;

  @ApiProperty()
  public chair: number;

  @ApiPropertyOptional({ type: () => UserProxy })
  public user: number;

  @ApiPropertyOptional({ type: () => EventProxy })
  public event: number;

  //#endregion

}
