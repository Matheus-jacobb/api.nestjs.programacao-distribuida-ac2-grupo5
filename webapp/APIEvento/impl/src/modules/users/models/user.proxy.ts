//#region Imports

import { ApiProperty } from '@nestjs/swagger';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../entities/user.entity';

//#endregion

export class UserProxy extends BaseCrudProxy {

  constructor(user: Partial<UserEntity> | UserEntity) {
    super(user);

    this.email = user.email;
    this.permissions = user.roles;
  }

  //#region Public Properties

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public permissions: string;

  //#endregion

}
