import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    })
  ],
  controllers: [],

})
export class AppModule {}
