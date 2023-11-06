//#region Imports

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../users/entities/user.entity';
import { IJwtPayload } from '../models/jwt.payload';
import { AuthService } from './auth.service';
import { jwtConstants } from '../constants/constants';

//#endregion

/**
 * A classe que representa a estrategia que lida com o JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  //#region Constructor

  constructor(
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  //#endregion

  //#region Public Methods

  public async validate(jwtPayload: IJwtPayload): Promise<Partial<UserEntity>> {
    return await this.authService.validateUserByPayload(jwtPayload);
  }

  //#endregion

}
