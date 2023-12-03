//#region Imports

import { Column, Entity, ManyToOne, Not, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/base-entity';
import { ToProxy } from '../../../common/to-proxy';
import { getCleanedEmail } from '../../../utils/xss';
import { EventProxy } from '../models/event.proxy';
import { TicketEntity } from '../../tickets/entities/ticket.entity';
import { TypeEnum } from '../models/type.enum';
import { PlaceEntity } from '../../places/entities/place.entity';

//#endregion

@Entity('events')
export class EventEntity extends BaseEntity implements ToProxy<EventProxy> {

  //#region Constructor

  constructor(partial: Partial<EventEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  @Column()
  public type: TypeEnum;

  @Column()
  public startDate: string;

  @Column()
  public endDate: string;

  @Column()
  public placeId: number;

  @ManyToOne(() => PlaceEntity, ul => ul.events)
  public place?: PlaceEntity;

  @OneToMany(() => TicketEntity, ul => ul.event)
  public tickets?: TicketEntity[];

  //#endregion

  //#region Public Methods

  public toProxy(): EventProxy {
    return new EventProxy(this);
  }

  //#endregion

  //#region Public Static Methods

  public static async hasUserWithEmail(email: string, ignoreUserId: number = -1): Promise<boolean> {
    email = getCleanedEmail(email);

    return await this.count({ where: { email, id: Not(ignoreUserId) } }).then(count => count > 0);
  }

  //#endregion

}
