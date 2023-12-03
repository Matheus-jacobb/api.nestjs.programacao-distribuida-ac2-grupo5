//#region Imports

import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

import { Column, Entity, Not, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/base-entity';
import { ToProxy } from '../../../common/to-proxy';
import { TypeOrmValueTypes } from '../../../models/enums/type-orm-value.types';
import { getCleanedEmail } from '../../../utils/xss';
import { UserProxy } from '../models/user.proxy';
import { TicketEntity } from '../../tickets/entities/ticket.entity';

//#endregion

@Entity('users')
export class UserEntity extends BaseEntity implements ToProxy<UserProxy> {

  //#region Constructor

  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  public email: string;

  @ApiProperty()
  @Column({ nullable: false })
  public password: string;

  @Exclude()
  @Column({ nullable: false })
  public roles: string;

  @OneToMany(() => TicketEntity, t => t.user)
  public tickets?: TicketEntity[];

  //#endregion

  //#region Public Methods

  public toProxy(): UserProxy {
    return new UserProxy(this);
  }

  //#endregion

  //#region Public Static Methods

  public static async getByEmail(email: string, validateIsActive: boolean = true): Promise<UserEntity | undefined> {
    const whereOptions = validateIsActive ? { isActive: TypeOrmValueTypes.TRUE } : {};

    email = getCleanedEmail(email);

    const user = await this.findOne<UserEntity>({ where: { email, ...whereOptions } });

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
