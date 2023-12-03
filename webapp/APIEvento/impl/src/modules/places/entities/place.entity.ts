//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { ToProxy } from '../../../common/to-proxy';
import { PlaceProxy } from '../models/place.proxy';
import { EventEntity } from '../../events/entities/event.entity';
import { TypeEnum } from '../../events/models/type.enum';

//#endregion

@Entity('places')
export class PlaceEntity extends BaseEntity implements ToProxy<PlaceProxy> {

  //#region Constructor

  constructor(partial: Partial<PlaceEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  @Column({ nullable: false })
  public type: TypeEnum;

  @ApiProperty()
  @Column({ nullable: false })
  public name: string;

  @ApiProperty()
  @Column({ nullable: false })
  public commonLimit: number;

  @ApiProperty()
  @Column({ nullable: false })
  public vipLimit: number;

  @OneToMany(() => EventEntity, ul => ul.tickets)
  public events?: EventEntity[];

  //#endregion

  //#region Public Methods

  public toProxy(): PlaceProxy {
    return new PlaceProxy(this);
  }

  //#endregion

}
