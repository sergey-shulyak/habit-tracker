import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { HttpBearerStrategy } from './strategies/http.bearer.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule,
  ],
  providers: [AuthService, HttpBearerStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
