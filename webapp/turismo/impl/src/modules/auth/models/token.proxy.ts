//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { UserProxy } from '../../users/models/user.proxy';

//#endregion

/**
 * A classe que representa o proxy que lida com o retorno das informações do token de autenticação
 */
export class TokenProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(token: string, expiresIn: string, refreshToken: string, refreshExpireIn: string, user: UserProxy) {
    this.token = `Bearer ${ token }`;
    this.refreshToken = `Bearer ${ refreshToken }`;

    const now = Date.now();
    
    const expiresInNumber = parseInt(expiresIn);
    const refreshExpireInNumber = parseInt(refreshExpireIn);

    this.expiresAt = new Date(now + expiresInNumber);
    this.refreshExpiresAt = new Date(now + refreshExpireInNumber);

    delete user.password;
    this.user = user;
  }

  //#endregion

  //#region Public Properties

  /**
   * O Bearer Token gerado pelo JWT
   */
  @ApiProperty()
  public token: string;

  /**
   * A data de quando irá expirar
   */
  @ApiProperty()
  public expiresAt: Date;

  /**
   * O Bearer Token gerado pelo JWT para atualizar e regerar um novo token
   */
  @ApiProperty()
  public refreshToken: string;

  /**
   * A data de quando irá expirar o token de atualização
   */
  @ApiProperty()
  public refreshExpiresAt: Date;

  @ApiProperty()
  public user: UserProxy;

  //#endregion

}
