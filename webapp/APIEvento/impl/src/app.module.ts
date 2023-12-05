import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthTokenModule } from './modules/auth/auth-token.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvModule } from './modules/env/env.module';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/users/users.module';
import { EventModule } from './modules/events/event.module';
import { PlaceModule } from './modules/places/place.module';
import { TicketsModule } from './modules/tickets/tickets.module';

const testModules = [];

if (process.env.NODE_ENV === 'test')
  testModules.push(TestModule);

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EnvModule,
    AuthModule,
    AuthTokenModule,
    UserModule,
    EventModule,
    PlaceModule,
    TicketsModule,
  ],
  providers: [
    EnvModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
}
