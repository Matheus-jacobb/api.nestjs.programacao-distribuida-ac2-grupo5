import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from "../../users/entities/user.entity";
import { UserProxy } from "../../users/models/user.proxy";
import { UserService } from "../../users/services/user.service";
import { LoginPayload } from "../models/login.payload";
import { TokenProxy } from "../models/token.proxy";
import { IJwtPayload } from "../models/jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(auth: LoginPayload) {
    const user = await this.usersService.findByEmail(auth.email);

    if (!user)
      throw new UnauthorizedException('Cadastro não encontrado.');

    await this.authenticate(auth, user);

    const expiresIn = '3600000';
    const refreshExpireIn = (parseInt(expiresIn) * 2).toString();

    const token = await this.jwtService.signAsync({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }, { expiresIn });

    const refreshToken = await this.jwtService.signAsync({
      refreshId: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }, { expiresIn: refreshExpireIn });

    return new TokenProxy(token, expiresIn, refreshToken, refreshExpireIn, user.id);
  }

  public async authenticate(auth: LoginPayload, user: UserProxy): Promise<UserProxy> {
    const passwordIsMatch = await bcryptjs.compare(auth.password, user.password);

    if (!passwordIsMatch)
      throw new UnauthorizedException('A senha ou o e-mail enviado estão incorretos.');

    return user;
  }

  public async validateUserByPayload(jwtPayload: IJwtPayload): Promise<UserEntity> {
    if (!jwtPayload)
      throw new UnauthorizedException('As informações para a autenticação não foram encontradas.');

    if (!jwtPayload.iat || !jwtPayload.exp || !jwtPayload.id)
      throw new UnauthorizedException('Os detalhes para a autenticação não foram encontrados.');

    const now = Date.now().valueOf() / 1000;
    const jwtExpiresIn = jwtPayload.exp;

    if (now > jwtExpiresIn)
      throw new UnauthorizedException('O token de autenticação está expirado.');

    const user = await this.usersService.findOne(jwtPayload.id).catch(() => null);

    if (user === null)
      throw new UnauthorizedException('Você não tem mais permissão para realizar essa ação, seu usuário foi desativado ou removido.');

    return user;
  }
}