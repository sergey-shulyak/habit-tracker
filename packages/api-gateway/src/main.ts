import * as helmet from 'helmet'

import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()
  app.use(helmet())

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('API Gateway is up and running 🚀')
  })
}

bootstrap()
