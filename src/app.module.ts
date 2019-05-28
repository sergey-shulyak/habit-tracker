import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, MailModule],
})
export class AppModule {}
