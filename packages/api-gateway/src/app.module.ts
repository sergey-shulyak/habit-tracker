import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { USER_SERVICE } from '@habit-tracker/shared/user'
import { AUTH_SERVICE } from '@habit-tracker/shared/auth'

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth/auth.controller'
import { UserController } from './user/user.controller'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP
      }
    ]),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}