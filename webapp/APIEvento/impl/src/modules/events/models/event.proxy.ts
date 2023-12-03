//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { EventEntity } from '../entities/event.entity';
import { TypeEnum } from './type.enum';
import { PlaceEntity } from '../../places/entities/place.entity';

//#endregion

export class EventProxy extends BaseCrudProxy {

  constructor(user: Partial<EventEntity> | EventEntity) {
    super(user);

    this.type = user.type;
    this.placeId = user.placeId;
    this.startDate = user.startDate;
    this.endDate = user.endDate;
  }

  //#region Public Properties

  @ApiProperty()
  public type: TypeEnum;

  @ApiProperty()
  public placeId: number;

  @ApiProperty()
  public startDate: string;

  @ApiProperty()
  public endDate: string;

  @ApiProperty({ type: () => PlaceEntity })
  public place: PlaceEntity;

  //#endregion

}
