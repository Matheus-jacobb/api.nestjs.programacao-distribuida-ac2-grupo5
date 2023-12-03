import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/users/user.module';
import { UserController } from '../../modules/users/controllers/user.controller';
import { TurismoController } from '../../modules/turismo/controllers/turismo.controller';
import { TurismoModule } from '../../modules/turismo/turismo.module';
import { UserTurismoModule } from '../../modules/user-turismo/user-turismo.module';
import { UserTurismoController } from '../../modules/user-turismo/controllers/user-turismo.controller';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthController } from '../../modules/auth/controllers/auth.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TurismoModule,
    UserTurismoModule,
  ],
  controllers: [
    AuthController,
    UserController,
    TurismoController,
    UserTurismoController,
  ],
})
export class HttpModule { }
