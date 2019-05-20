import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
})
export class AppModule {}
