import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';
import { JwtService } from './jwt.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [
  ],
  providers: [
    AuthService,
    JwtService,
    CryptoService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
