import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: Number(process.env.PORT) || 3002
    }
  })
  app.listen(() => Logger.log('Auth Service is up and running 🚀'))
}

bootstrap()
