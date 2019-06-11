import { Test } from '@nestjs/testing'
import { User } from '../user.entity'
import { UserController } from '../user.controller'
import { UserRepository as UserMockRepository } from '../__mocks__/user.repository'
import { UserService } from '../user.service'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('Users Controller', () => {
  let controller: UserController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: new UserMockRepository(),
        },
        UserService,
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
