import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
