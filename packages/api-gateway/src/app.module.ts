import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserController } from './user/user.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { USER_SERVICE } from '@habit-tracker/shared'

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
    ]),
  ],
  controllers: [UserController],
})
export class AppModule {}
