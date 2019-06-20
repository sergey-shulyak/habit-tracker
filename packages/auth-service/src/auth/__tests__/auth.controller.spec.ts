import { Test, TestingModule } from '@nestjs/testing'

import { AuthController } from '../../../../api-gateway/src/auth/auth.controller'
import { AuthService } from '../auth.service'

describe.skip('Auth Controller', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
