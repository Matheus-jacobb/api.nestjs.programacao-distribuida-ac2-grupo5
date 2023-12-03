//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { PlaceEntity } from '../entities/place.entity';
import { EventProxy } from '../../events/models/event.proxy';
import { TypeEnum } from '../../events/models/type.enum';
import { mapCrudIfValid } from '../../../utils/crud';

//#endregion

export class PlaceProxy extends BaseCrudProxy {

  constructor(place: Partial<PlaceEntity> | PlaceEntity) {
    super(place);

    this.type = place.type;
    this.name = place.name;
    this.commonLimit = place.commonLimit;
    this.vipLimit = place.vipLimit;
    this.events = mapCrudIfValid(place.events, true);
  }

  //#region Public Properties

  @ApiProperty()
  public type: TypeEnum;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public commonLimit: number;

  @ApiProperty()
  public vipLimit: number;

  @ApiProperty()
  public events?: EventProxy[];

  //#endregion

}
