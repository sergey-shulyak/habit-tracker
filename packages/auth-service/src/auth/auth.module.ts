import { AuthService } from './auth.service'
import { CryptoService } from './crypto.service'
import { JwtService } from './jwt.service'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { ClientsModule } from '@nestjs/microservices'
import { USER_SERVICE, MAIL_SERVICE } from '@habit-tracker/shared'
import { Transport } from '@nestjs/common/enums/transport.enum'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: MAIL_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
    ]),
  ],
  providers: [AuthService, JwtService, CryptoService],
  controllers: [AuthController],
})
export class AuthModule {}
