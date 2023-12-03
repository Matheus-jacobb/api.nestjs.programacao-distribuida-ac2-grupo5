//#region Imports

import { NotFoundException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

import { Column, Entity, ManyToOne, Not, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/base-entity';
import { ToProxy } from '../../../common/to-proxy';
import { TypeOrmValueTypes } from '../../../models/enums/type-orm-value.types';
import { getCleanedEmail } from '../../../utils/xss';
import { TicketProxy } from '../models/ticket.proxy';
import { UserEntity } from '../../users/entities/user.entity';
import { EventEntity } from '../../events/entities/event.entity';

//#endregion

@Entity('users')
export class TicketEntity extends BaseEntity implements ToProxy<TicketProxy> {

  //#region Constructor

  constructor(partial: Partial<TicketEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  @Column({ nullable: false })
  public userId: number;

  @ApiProperty()
  @Column({ nullable: false })
  public eventId: number;

  @ApiProperty()
  @Column({ nullable: false })
  public chair: number;

  @ApiProperty()
  @Column({ nullable: false })
  public isVip: boolean;

  @ManyToOne(() => UserEntity, ul => ul.tickets)
  public user?: UserEntity;

  @ManyToOne(() => EventEntity, ul => ul.tickets)
  public event?: EventEntity;

  //#endregion

  //#region Public Methods

  public toProxy(): TicketProxy {
    return new TicketProxy(this);
  }

  //#endregion

  //#region Public Static Methods

  public static async getByEmail(email: string, validateIsActive: boolean = true): Promise<TicketEntity | undefined> {
    const whereOptions = validateIsActive ? { isActive: TypeOrmValueTypes.TRUE } : {};

    email = getCleanedEmail(email);

    const user = await this.findOne<TicketEntity>({ where: { email, ...whereOptions } });

    if (!user)
      throw new NotFoundException('O usuário com o e-mail informado não existe ou foi desativado.');

    return user;
  }

  public static async hasUserWithEmail(email: string, ignoreUserId: number = -1): Promise<boolean> {
    email = getCleanedEmail(email);

    return await this.count({ where: { email, id: Not(ignoreUserId) } }).then(count => count > 0);
  }

  //#endregion

}
