import * as path from 'path'

import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { USER_SERVICE } from '@habit-tracker/shared/user'
import { AUTH_SERVICE } from '@habit-tracker/shared/auth'

import { LocalStrategy } from './authStrategies/local.strategy'
import { JwtStrategy } from './authStrategies/jwt.strategy'
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
        options: {
          port: 3001,
        },
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  providers: [LocalStrategy, JwtStrategy],
  controllers: [AuthController, UserController],
})
export class AppModule {}
