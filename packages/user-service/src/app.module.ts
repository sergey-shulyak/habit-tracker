import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
      },
    ]),
    UserModule,
  ],
})
export class AppModule {}
