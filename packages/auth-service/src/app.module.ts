import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { USER_SERVICE } from '@habit-tracker/shared/user'
import { Transport, ClientsModule } from '@nestjs/microservices'

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
      },
    ]),
  ],
})
export class AppModule {}
